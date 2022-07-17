import pickle as pkl
import pandas as pd
import numpy as np
import joblib
import torch

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


def inference_task2():
    pass


def get_suggestions(data: str) -> list:
    return ['example0', 'example1', 'example2', 'example3', 'example4']