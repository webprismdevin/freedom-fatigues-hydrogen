import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import client from "~/lib/sanity";
import styles from "../styles/index.css";

import Image from "remix-image";

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
      <div className="hero">
        <img
          src={data.home.hero.content[0].product.store.previewImageUrl}
          loading="eager"
          alt=""
          height={1080}
          width={1080}
          sizes="(max-width: 1080px) 100vw, 1080px"
        />
      </div>
      <div style={{ display: "flex", overflow: "scroll", gap: "2rem" }}>
        {data.products.map((product: any) => (
          <div key={product.store.slug.current}>
            <Image
              loaderUrl="/api/image"
              src={product.store.previewImageUrl}
              responsive={[
                {
                  size: {
                    width: 192,
                    height: 192,
                  },
                  maxWidth: 256,
                },
              ]}
              dprVariants={[1, 3]}
              alt={product.store.title}
            />
            <h2>{product.store.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
