import axios from "./API";

const ArticleServise = {
  async getArticles() {
    const { data } = await axios.get("/articles");
    return data;
  },
  async getArticleDetail(id) {
    const { data } = await axios.get(`/articles/${id}`);
    return data;
  },
  async createArticle(article) {
    const { data } = await axios.post("/articles", { article });
    return data;
  },
  async deleteArticle(slug) {
    const { data } = await axios.delete(`/articles/${slug}`);
    return data;
  },
  async editArticle(slug, article) {
    const { data } = await axios.put(`/articles/${slug}`, article);
    return data;
  },
};

export default ArticleServise;
