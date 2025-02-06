let nkmClient = null;
let nkmSession = null;

const setNkm = (value, session) => {
  nkmClient = value;
  nkmSession = session;
};

const getPosts = async () => {
  if (!nkmClient || !nkmSession) return;
  const posts = await nkmClient.rpc(nkmSession, "post:list", {});
  return posts.payload;
};

const getPost = async (postId) => {
  if (!nkmClient || !nkmSession) return;
  const res = await nkmClient.rpc(nkmSession, "post:get", { postId });
  return res.payload;
};

const addPost = async (post) => {
  if (!nkmClient || !nkmSession) return;
  const res = await nkmClient.rpc(nkmSession, "post:add", post);
  return res.payload;
};

export { setNkm, getPosts, addPost, getPost };
