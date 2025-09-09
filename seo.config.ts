import { seo } from "@/lib/seo";

const SEO = {
	titleTemplate: `%s - ${seo.title}`,
	defaultTitle: `Nahara Technologies - ${seo.title}`,
	description: seo.description,
	openGraph: {
		type: "website",
		locale: "en_US",
		url: seo.website,
		site_name: seo.title,
		images: [
			{
				url: seo.logo,
				width: 1200,
				height: 630,
				alt: seo.title,
			},
		],
	},
};
export default SEO;
