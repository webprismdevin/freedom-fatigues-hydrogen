import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import client from "~/lib/sanity";

export const loader = async () => {
  const res = await client.fetch(
    `{
      "products": *[_type == "product"]{ store { title, slug, previewImageUrl } }[0..9],
      "home": *[_type == "home"]{
        hero {
          content[]{
            product->
          }
        }
      }[0]
    }`
  );

  return json({ data: res });
};

export default function Index() {
  const { data } = useLoaderData();

  console.log(data);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Freedom Fatigues</h1>
      <div>
        <img src={data.home.hero.content[0].product.store.previewImageUrl} loading="eager" />
      </div>
      <div style={{ display: "flex", overflow: "scroll", gap: "2rem" }}>
        {data.products.map((product: any) => (
          <div key={product.store.slug.current}>
            <img
              src={product.store.previewImageUrl}
              alt={product.store.title}
              height={256}
              width={256}
            />
            <h2>{product.store.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
