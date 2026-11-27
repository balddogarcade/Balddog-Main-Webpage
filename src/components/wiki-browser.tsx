"use client";

import * as React from "react";
import { BookOpen, ChevronLeft, ChevronRight, Clock, Search } from "lucide-react";
import { WIKI_ARTICLES, WIKI_CATEGORIES, type WikiCategoryId } from "@/data/wiki";
import { trackEvent, trackFilter } from "@/lib/analytics";

export function WikiBrowser() {
  const [selectedCategory, setSelectedCategory] = React.useState<WikiCategoryId | "all">("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeArticleId, setActiveArticleId] = React.useState<string>(WIKI_ARTICLES[0]?.id ?? "");

  const filteredArticles = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return WIKI_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      const inTitle = article.title.toLowerCase().includes(q);
      const inSummary = article.summary.toLowerCase().includes(q);
      const inSections = article.sections.some(
        (s) =>
          s.heading.toLowerCase().includes(q) ||
          s.paragraphs?.some((p) => p.toLowerCase().includes(q)) ||
          s.steps?.some((st) => st.toLowerCase().includes(q))
      );
      return inTitle || inSummary || inSections;
    });
  }, [selectedCategory, searchQuery]);

  const activeArticle =
    filteredArticles.find((a) => a.id === activeArticleId) ??
    filteredArticles[0] ??
    null;

  const activeIndex = activeArticle
    ? filteredArticles.findIndex((a) => a.id === activeArticle.id)
    : -1;

  const prevArticle = activeIndex > 0 ? filteredArticles[activeIndex - 1] : null;
  const nextArticle =
    activeIndex >= 0 && activeIndex < filteredArticles.length - 1
      ? filteredArticles[activeIndex + 1]
      : null;

  const handleSelectArticle = (articleId: string, category: WikiCategoryId) => {
    setActiveArticleId(articleId);
    trackEvent("wiki_article_select", { article_id: articleId, category });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    trackFilter("wiki_search", value || "clear", "wiki_browser");
  };

  const handleCategoryChange = (category: WikiCategoryId | "all") => {
    setSelectedCategory(category);
    trackFilter("wiki_category", category, "wiki_browser");
  };

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Bar */}
      <div className="bg-carbon border border-charcoal p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 text-muted-gray absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar en guías de usuario..."
            aria-label="Buscar en guías de usuario"
            className="w-full bg-obsidian border border-charcoal focus:border-steel pl-9 pr-3 py-2 text-sm text-pure-white placeholder:text-muted-gray outline-none rounded-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            className={`px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider border rounded-none transition-colors ${
              selectedCategory === "all"
                ? "bg-arcade-magenta/15 border-arcade-magenta text-arcade-magenta"
                : "bg-obsidian border-charcoal text-silver-gray hover:text-pure-white hover:border-steel"
            }`}
          >
            Todas ({WIKI_ARTICLES.length})
          </button>
          {WIKI_CATEGORIES.map((cat) => {
            const count = WIKI_ARTICLES.filter((a) => a.category === cat.id).length;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider border rounded-none transition-colors ${
                  isActive
                    ? "bg-arcade-magenta/15 border-arcade-magenta text-arcade-magenta"
                    : "bg-obsidian border-charcoal text-silver-gray hover:text-pure-white hover:border-steel"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Wiki Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Index */}
        <aside className="lg:col-span-4 bg-carbon border border-charcoal divide-y divide-charcoal">
          <div className="px-4 py-3 bg-pure-black flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-arcade-magenta" />
            <h2 className="font-display text-xs font-bold uppercase tracking-wider text-pure-white">
              Índice de Guías
            </h2>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="p-4 text-sm text-muted-gray">
              No se encontraron guías para &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            <ul className="divide-y divide-charcoal">
              {filteredArticles.map((article, idx) => {
                const isSelected = activeArticle?.id === article.id;
                return (
                  <li key={article.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectArticle(article.id, article.category)}
                      className={`w-full text-left px-4 py-3 transition-colors border-l-2 ${
                        isSelected
                          ? "bg-obsidian border-l-arcade-magenta text-pure-white"
                          : "bg-carbon border-l-transparent text-silver-gray hover:bg-obsidian/60 hover:text-pure-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-muted-gray">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[11px] text-muted-gray">
                          {article.readTime}
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-sm font-display font-bold ${
                          isSelected ? "text-arcade-magenta" : "text-pure-white"
                        }`}
                      >
                        {article.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-gray line-clamp-2">
                        {article.summary}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        {/* Article Reader */}
        <article className="lg:col-span-8 bg-carbon border border-charcoal">
          {!activeArticle ? (
            <div className="p-8 text-center space-y-2">
              <p className="font-display text-base font-bold text-pure-white">
                Sin resultados
              </p>
              <p className="text-sm text-muted-gray">
                Prueba limpiando el filtro de búsqueda para ver todas las guías disponibles.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-charcoal">
              {/* Article Header */}
              <header className="p-5 sm:p-6 bg-pure-black space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="inline-block px-2.5 py-1 bg-arcade-magenta/15 border border-arcade-magenta/50 text-[11px] font-display font-bold uppercase tracking-wider text-arcade-magenta rounded-none">
                    {WIKI_CATEGORIES.find((c) => c.id === activeArticle.category)?.label ??
                      "Guía"}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-muted-gray">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {activeArticle.readTime}
                    </span>
                    <span>Actualizado: {activeArticle.updatedAt}</span>
                  </div>
                </div>
                <h1 className="font-display text-xl sm:text-2xl font-bold text-pure-white">
                  {activeArticle.title}
                </h1>
                <p className="text-sm text-silver-gray leading-relaxed">
                  {activeArticle.summary}
                </p>
              </header>

              {/* Article Sections */}
              <div className="p-5 sm:p-6 space-y-6">
                {activeArticle.sections.map((section) => (
                  <section key={section.heading} className="space-y-3">
                    <h2 className="font-display text-base font-bold uppercase tracking-wider text-pure-white border-b border-charcoal pb-2">
                      {section.heading}
                    </h2>

                    {section.paragraphs?.map((paragraph, i) => (
                      <p key={i} className="text-sm text-silver-gray leading-relaxed">
                        {paragraph}
                      </p>
                    ))}

                    {section.steps && section.steps.length > 0 && (
                      <ol className="space-y-2">
                        {section.steps.map((step, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 bg-obsidian border border-charcoal p-3 text-sm text-silver-gray"
                          >
                            <span className="font-mono text-xs font-bold text-arcade-magenta shrink-0 mt-0.5">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    )}

                    {section.note && (
                      <div className="bg-pure-black border-l-2 border-arcade-magenta border-y border-r border-y-charcoal border-r-charcoal p-3 text-xs sm:text-sm text-silver-gray">
                        <span className="font-display font-bold uppercase tracking-wider text-arcade-magenta mr-2">
                          Nota:
                        </span>
                        {section.note}
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Article Footer Navigation */}
              <footer className="p-4 sm:p-5 bg-pure-black flex items-center justify-between gap-3 flex-wrap">
                {prevArticle ? (
                  <button
                    type="button"
                    onClick={() => handleSelectArticle(prevArticle.id, prevArticle.category)}
                    className="inline-flex items-center gap-2 bg-carbon border border-charcoal hover:border-steel px-3 py-2 text-xs font-display font-bold uppercase tracking-wider text-silver-gray hover:text-pure-white transition-colors rounded-none"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    {prevArticle.title}
                  </button>
                ) : (
                  <span />
                )}

                {nextArticle && (
                  <button
                    type="button"
                    onClick={() => handleSelectArticle(nextArticle.id, nextArticle.category)}
                    className="inline-flex items-center gap-2 bg-carbon border border-charcoal hover:border-steel px-3 py-2 text-xs font-display font-bold uppercase tracking-wider text-silver-gray hover:text-pure-white transition-colors rounded-none ml-auto"
                  >
                    {nextArticle.title}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </footer>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
