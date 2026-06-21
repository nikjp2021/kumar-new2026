import createNextIntlPlugin from "next-intl/plugin";
import { redirects } from "./src/lib/redirects.ts";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects,
};

export default withNextIntl(nextConfig);
