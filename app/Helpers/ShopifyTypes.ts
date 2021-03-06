type variant = {
  id: string;
  sku: string;
  grams: number;
  price: number;
  title: string;
  weight: number;
  barcode: string;
  option1: string;
  taxable: boolean;
  position: number;
  created_at: Date;
  product_id: number;
  updated_at: Date;
  weight_unit: string;
  compare_at_price: any;
  inventory_policy: any;
  inventory_item_id: number;
  requires_shipping: boolean;
  inventory_quantity: number;
  fulfillment_service: any;
  inventory_management: any;
};

type option = {
  id: number;
  name: string;
  values: string[];
  position: number;
  product_id: number;
};

type image = {
  id: number;
  src: string;
  width: number;
  height: number;
  position: number;
  created_at: Date;
  product_id: number;
  updated_at: Date;
  variant_ids: {}[];
};

export type product = {
  id: string;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: Date;
  published_at: Date;
  template_suffix: any;
  status: string;
  published_scope: string;
  tags: string;
  admin_graphql_api_id: string;
  variants: variant[];
  options: option[];
  images: image[];
  image: any;
};
