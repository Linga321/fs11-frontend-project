import { Product } from "../../redux/types/product";
import {category} from './categoryTestData'

export const product: Product = {
  id: 100,
  title: "tesing",
  price: 150,
  description: "test description",
  category: category,
  images: ["https://api.lorem.space/image/face?w=640&h=480&r=6450"],
};

export const editProduct: Product = {
  id: 100,
  title: "tesing 2",
  price: 500,
  description: "test description 3",
  category: category,
  images: ["https://api.lorem.space/image"],
};
