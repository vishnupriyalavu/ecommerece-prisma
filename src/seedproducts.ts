import axios from "axios";
import https from "https";
import { prisma } from "./lib/prisma";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function seedProducts() {
  try {
    const res = await axios.get("https://fakestoreapi.com/products", {
      httpsAgent: agent,
    });

    const products = res.data;

    for (const p of products) {
      await prisma.product.create({
        data: {
          title: p.title,
          description: p.description,
          price: p.price,
          productImg: p.image,
        },
      });
    }

    console.log("Products seeded successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();