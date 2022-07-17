import pickle as pkl
import pandas as pd
import numpy as np
import joblib
import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModel
from sklearn.metrics.pairwise import cosine_similarity

with open("product_name_2_product_tensor.pkl", "rb") as f:
    title_embs = pkl.load(f)

with open("reglament_name_2_reglament_tensor.pkl", "rb") as f:
    regl_embs = pkl.load(f)

with open("group_name_2_group_tensor.pkl", "rb") as f:
    group_embs = pkl.load(f)

with open('tnved_map_embs.pkl', 'rb') as f:
    tnved_embs = pkl.load(f)

tnved2_embs = pd.read_csv("tnved2_embs.csv", index_col=0)
tnved3_embs = pd.read_csv("tnved3_embs.csv", index_col=0)
tnved4_embs = pd.read_csv("tnved4_embs.csv", index_col=0)

tnved2 = pd.read_csv("TNVED2.csv", index_col=0)
tnved3 = pd.read_csv("TNVED3.csv", index_col=0)
tnved4 = pd.read_csv("TNVED4.csv", index_col=0)

tnved_pca = joblib.load('tnved_pca.joblib')
merged_pca = joblib.load('merged_pca.joblib')
model = joblib.load('model.joblib')

zero_emb = pd.DataFrame(np.zeros(768).reshape(1, -1)).iloc[0]


# In[28]:


def parse_tnved(tnved_code):
    gruppa = int(tnved_code // 1e8)
    tov_poz = int(tnved_code // 1e6 % 100)
    sub_poz = int(tnved_code % 1000000)
    gr_name = tnved2[tnved2.gruppa == gruppa]
    gr_name = tnved2_embs.loc[gr_name.index.values[0]] if len(gr_name) > 0 else zero_emb
    tov_pos_name = tnved3[(tnved3.tov_poz == tov_poz) & (tnved3.gruppa == gruppa)]
    tov_pos_name = tnved3_embs.loc[tov_pos_name.index.values[0]] if len(tov_pos_name) > 0 else zero_emb
    sub_poz_name = tnved4[(tnved4.sub_poz == sub_poz) & (tnved4.gruppa == gruppa)]
    sub_poz_name = tnved4_embs.loc[sub_poz_name.index.values[0]] if len(sub_poz_name) > 0 else zero_emb
    return pd.concat([gr_name, tov_pos_name, sub_poz_name])


def inference_task1(name, tnved, regl, group):
    code = int(tnved)
    code_emb = torch.Tensor(parse_tnved(code).values)
    code_emb = tnved_pca.transform(code_emb.reshape(1, -1))
    merged_emb = torch.concat(
        [title_embs[name][0].detach().cpu(), torch.tensor(code_emb[0]), regl_embs[regl][0].detach().cpu(),
         group_embs[group][0].detach().cpu()])
    merged_emb = merged_pca.transform(merged_emb.reshape(1, -1))
    return model.predict(merged_emb)




tokenizer = AutoTokenizer.from_pretrained("bert-base-multilingual-cased", truncation=True)
model = AutoModel.from_pretrained("bert-base-multilingual-cased").to("cpu")

group_embs = pd.read_csv("production_groups_clear.csv", index_col=0)
title_embs = pd.read_csv("production_names_clear.csv", index_col=0)
short_data = pd.read_csv("simple_dataset_clear.csv", index_col=0).reset_index(drop=True)


def inference_task2(product_name, title_embs, group_embs, short_data):
    def top_k(a, k):
        idx = np.argpartition(a, -k)[-k:]
        idx_test = np.argpartition(a, -k)[0]
        return idx, a[idx]

    def BERT_encode(text, model, tokenizer):
        t = tokenizer(text, padding=True, truncation=True, return_tensors='pt')
        with torch.no_grad():
            model_output = model(**{k: torch.tensor(v).to(model.device) for k, v in t.items()})

        embeddings = model_output.last_hidden_state[:, 0, :]
        embeddings = torch.nn.functional.normalize(embeddings)
        return embeddings

    target_embedding = BERT_encode([product_name], model, tokenizer).cpu().numpy()

    ge = title_embs

    idxs, arr = top_k(cosine_similarity(target_embedding, ge.values)[0], 6)
    predicted_title = short_data.loc[ge.iloc[idxs].index.values].full_title.values
    predicted_group = short_data.loc[ge.iloc[idxs].index.values].group.values
    predicted_tnved = short_data.loc[ge.iloc[idxs].index.values].tnved.values
    predcited_reglament = short_data.loc[ge.iloc[idxs].index.values].tech_reg.values

    return predcited_reglament, predicted_group, predicted_tnved

def get_suggestions(data: str) -> list:
    return ['example0', 'example1', 'example2', 'example3', 'example4']