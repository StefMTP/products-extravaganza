import axios from "axios";
import { ClientApplication } from "@shopify/app-bridge";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";

export const getAppCredentials = async (redirectUri: string, shop: string) => {
  const res = await axios.get(`${redirectUri}/credentials?shop=${shop}`);
  return res;
};

export const getDefaultSettings = async (redirectUri: string) => {
  const res = await axios.get(`${redirectUri}/settings`);
  return res;
};

export const getProducts = async (
  redirectUri: string,
  app: ClientApplication<any>,
  pageLimit: number,
  pageQuery?: string,
  queryFilters?: { key: string; value: string }[]
) => {
  const sessionToken = await getSessionToken(app);
  let link = `${redirectUri}/shop/products?page_limit=${pageLimit}`;
  if (pageQuery) {
    link += "&page_query=" + pageQuery;
  }
  if (queryFilters && queryFilters.length > 0) {
    for (const filter of queryFilters) {
      link += `&${filter.key}=${filter.value}`;
    }
  }
  const res = await axios.get(link, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });
  if (res.data.redirect) {
    Redirect.create(app).dispatch(Redirect.Action.REMOTE, res.data.redirect);
  }
  return res;
};

export const getProduct = async (
  redirectUri: string,
  app: ClientApplication<any>,
  productId: string,
  fields: string[]
) => {
  const sessionToken = await getSessionToken(app);
  const requestFields = fields.join(",");
  const res = await axios.get(`${redirectUri}/shop/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
    params: {
      fields: requestFields,
    },
  });
  if (res.data.redirect) {
    Redirect.create(app).dispatch(Redirect.Action.REMOTE, res.data.redirect);
  }
  return res;
};

export const getProductsCount = async (
  redirectUri: string,
  app: ClientApplication<any>,
  queryFilters?: { key: string; value: string }[]
) => {
  const sessionToken = await getSessionToken(app);
  let link = `${redirectUri}/shop/products/count`;
  if (queryFilters && queryFilters.length > 0) {
    link += "?";
    for (const filter of queryFilters) {
      link += `${filter.key}=${filter.value}&`;
    }
    link = link.slice(0, -1);
  }
  const res = await axios.get(link, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });

  if (res.data.redirect) {
    Redirect.create(app).dispatch(Redirect.Action.REMOTE, res.data.redirect);
  }
  return res;
};

export const getTotalVariantsCount = async (
  redirectUri: string,
  app: ClientApplication<any>
) => {
  const sessionToken = await getSessionToken(app);
  const res = await axios.get(`${redirectUri}/shop/products/totalVariants`, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });
  if (res.data.redirect) {
    Redirect.create(app).dispatch(Redirect.Action.REMOTE, res.data.redirect);
  }
  return res;
};

export const getAllProductsOptions = async (
  redirectUri: string,
  app: ClientApplication<any>
) => {
  const sessionToken = await getSessionToken(app);
  const res = await axios.get(`${redirectUri}/shop/products/allOptions`, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });
  if (res.data.redirect) {
    Redirect.create(app).dispatch(Redirect.Action.REMOTE, res.data.redirect);
  }
  return res;
};

export const editProductType = async (
  redirectUri: string,
  app: ClientApplication<any>,
  productId: string,
  productType: string
) => {
  const sessionToken = await getSessionToken(app);
  const res = await axios.post(
    `${redirectUri}/shop/products/editProductType`,
    {
      id: productId,
      product_type: productType,
    },
    { headers: { Authorization: `Bearer ${sessionToken}` } }
  );
  return res;
};

export const addTagToProduct = async (
  redirectUri: string,
  app: ClientApplication<any>,
  productTags: string,
  productId: string,
  tagInput: string
): Promise<any> => {
  const sessionToken = await getSessionToken(app);
  if (productTags.includes(tagInput)) {
    const res = { message: "Tag already exists on product" };
    return res;
  }
  const res = await axios.post(
    `${redirectUri}/shop/products/editTag`,
    {
      id: productId,
      tags: `${productTags},${tagInput}`,
    },
    { headers: { Authorization: `Bearer ${sessionToken}` } }
  );
  return res;
};

export const deleteTagFromProduct = async (
  redirectUri: string,
  app: ClientApplication<any>,
  productTags: string,
  productId: string,
  tagToDelete: string
) => {
  const sessionToken = await getSessionToken(app);
  const tagsRemaining = productTags
    .split(", ")
    .filter((tag) => tag !== tagToDelete);
  const res = await axios.post(
    `${redirectUri}/shop/products/editTag`,
    {
      id: productId,
      tags: tagsRemaining,
    },
    { headers: { Authorization: `Bearer ${sessionToken}` } }
  );
  return res;
};

export const getTagProducts = async (
  redirectUri: string,
  app: ClientApplication<any>,
  tag: string
) => {
  const sessionToken = await getSessionToken(app);
  const res = await axios.get(
    `${redirectUri}/shop/products/tagProducts?tag=${tag}`,
    {
      headers: { Authorization: `Bearer ${sessionToken}` },
    }
  );

  return res;
};

export const getAllShopProductTags = async (
  redirectUri: string,
  app: ClientApplication<any>
) => {
  const sessionToken = await getSessionToken(app);
  const res = await axios.get(`${redirectUri}/shop/products/tags`, {
    headers: { Authorization: `Bearer ${sessionToken}` },
  });

  return res;
};

export const getAllShopProductTypes = async (
  redirectUri: string,
  app: ClientApplication<any>
) => {
  const sessionToken = await getSessionToken(app);
  const res = await axios.get(`${redirectUri}/shop/productTypes`, {
    headers: { Authorization: `Bearer ${sessionToken}` },
  });

  return res;
};

export const getCollections = async (
  redirectUri: string,
  app: ClientApplication<any>
) => {
  const sessionToken = await getSessionToken(app);
  const res = await axios.get(`${redirectUri}/shop/collections`, {
    headers: { Authorization: `Bearer ${sessionToken}` },
  });

  return res;
};

export const getCollectionProducts = async (
  redirectUri: string,
  app: ClientApplication<any>,
  collectionId: string
) => {
  const sessionToken = await getSessionToken(app);
  const res = await axios.get(
    `${redirectUri}/shop/products/collection?collection_id=${collectionId}`,
    {
      headers: { Authorization: `Bearer ${sessionToken}` },
    }
  );

  return res;
};
