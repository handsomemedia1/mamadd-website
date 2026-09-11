# MASTER INSTRUCTIONS FOR SEO CONTENT WRITERS

Business: Mama DD’s African Kitchen, 134 Waalstraat, 7523 RM Enschede, Netherlands
Website: https://www.mamadd.com
Positioning: Authentic home-cooked Nigerian and West African food in Enschede.

## Quality & Tone
- Warm, human, knowledgeable, welcoming, culturally respectful.
- Imagine explaining Nigerian food to a curious Dutch person who has never eaten it.
- NO generic AI introductions ("In this article, we will...").
- NO keyword stuffing. NO fake storytelling, quotes, or statistics.
- Explain unfamiliar terms (swallow, egusi, ogbono, amala, asun, jollof).
- Target Length: ~1,400 to 2,000+ words per article. DO NOT write thin 500-word articles.
- Use short/medium paragraphs, bullet lists, and H2/H3 headings.
- Start with a strong opening, provide a concise 40-70 word direct answer to the query immediately after, then expand.

## Internal Linking & CTA
- Link naturally to related articles using contextual anchor text.
- Connect local intent articles to `/menu` and `/contact`.
- Use natural CTAs at the end of the article (e.g. "Want to explore Nigerian food? Take a look at Mama DD's menu in Enschede.")

## Output Format
Write pure Markdown (no YAML frontmatter). Use `#` for the main title, `##` for sections.
Save each article in the directory assigned to you (`content/cluster1/`, `content/cluster2/`, or `content/cluster3/`). Use the article slug as the filename (e.g., `what-is-jollof-rice.md`).

## IMPORTANT
You are writing LONG-FORM content. Write one article at a time using `write_to_file`. Do not attempt to write multiple articles in a single tool call, as you will exceed your output token limit.
