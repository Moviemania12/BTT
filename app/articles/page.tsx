import { redirect } from "next/navigation";

export default function ArticlesPage() {
  // Redirect to the featured article
  redirect("/articles/data-center-kya-hota-hai");
}
