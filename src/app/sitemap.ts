import type { MetadataRoute } from "next";
import { posts } from "./blog/posts";
import { services } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://one-reign.vercel.app";

  const staticRoutes = [
    "",
    "/products",
    "/products/faultline",
    "/products/quiet",
    "/works",
    "/services",
    "/pricing",
    "/about",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" || route.startsWith("/products") || route === "/services"
      ? "weekly"
      : "monthly") as "weekly" | "monthly",
    priority:
      route === ""
        ? 1.0
        : route.startsWith("/products") || route === "/services"
        ? 0.9
        : 0.7,
  }));

  const serviceRoutes = services.map((svc) => ({
    url: `${baseUrl}/services/${svc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
