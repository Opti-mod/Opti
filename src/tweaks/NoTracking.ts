// Thanks aliucord
import { FluxDispatcher, moment } from "@metro/common";
import { findByProps } from "@metro/filters";
import { insteadDoNothing } from "@/lib/patcher";

export function initAntiTrack() {
    console.log("Analytics are gone.");
    const Reporter = findByProps("submitLiveCrashReport");
    const Metadata = findByProps("trackWithMetadata");
    const Analytics = findByProps("AnalyticsActionHandlers");
    const Properties = findByProps("encodeProperties", "track");

    if (Properties) insteadDoNothing(Properties, "track");
    if (Reporter) insteadDoNothing(Reporter, "submitLiveCrashReport");
    if (Analytics) insteadDoNothing(Analytics.AnalyticsActionHandlers, "handleTrack");
    if (Metadata) insteadDoNothing(Metadata, "trackWithMetadata");
    console.log("Analytics are gone 2.");

    const Sentry = {
        main: window.__SENTRY__?.hub,
        client: window.__SENTRY__?.hub?.getClient(),
        logger: window.__SENTRY__?.logger
    };

    if (Sentry.main && Sentry.client) {
        Sentry.client.close();
        Sentry.logger.disable();
        Sentry.main.getStackTop().scope.clear();
        Sentry.main.getScope().clear();
        insteadDoNothing(Sentry.main, "addBreadcrumb");

      //  const c = console as any;
      //  for (const method in c) {
      //      if (c[method].__sentry_original__)
      //          c[method] = c[method].__sentry_original__;
     //       if (c[method].__REACT_DEVTOOLS_ORIGINAL_METHOD__?.__sentry_original__)
       //         c[method].__REACT_DEVTOOLS_ORIGINAL_METHOD__ = c[method].__REACT_DEVTOOLS_ORIGINAL_METHOD__.__sentry_original__;
        //}
    }
}
