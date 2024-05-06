import { posts } from "#site/content";
import { notFound } from "next/navigation";

// import "@/styles/mdx.css";
import { Metadata } from "next";
import { Tag } from "@/components/Resources/Blog/Tag";
import MDXContent from "@/components/Resources/Blog/MDXContent";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  // @ts-ignore
  const { slug, title, description } = post

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", title);

  return {
    title: title,
    description: description,
    // authors: { name: siteConfig.author },
    openGraph: {
      title: title,
      description: description,
      type: "article",
      url: slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  // @ts-ignore
  if (!post || !post.published) {
    notFound();
  }
  // @ts-ignore
  const { title, tags, description, body} = post

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{title}</h1>
      <div className="flex gap-2 mb-2">
        {tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      {description ? (
        <p className="text-xl mt-0 text-muted-foreground">{description}</p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={body} />
    </article>
  );
}