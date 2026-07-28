import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "use-intl";
import { routing } from "@/libs/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const [common, game_list, join, ourteam, devblogs, faq] = await Promise.all([
    import(`@/locales/${locale}.json`),
    import(`@/locales/games/${locale}.json`),
    import(`@/locales/join/${locale}.json`),
    import(`@/locales/ourteam/${locale}.json`),
    import(`@/locales/devblogs/${locale}.json`),
    import(`@/locales/faq/${locale}.json`),
  ]);

  return {
    locale,
    messages: {
      ...common.default,
      game_list: game_list.default,
      join: join.default,
      ourteam: ourteam.default,
      devblogs: devblogs.default,
      faq: faq.default,
    },
  };
});
