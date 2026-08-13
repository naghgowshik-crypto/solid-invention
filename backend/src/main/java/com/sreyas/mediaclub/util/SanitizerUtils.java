package com.sreyas.mediaclub.util;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

public class SanitizerUtils {

    /**
     * Strips all unsafe HTML tags and malicious script attributes.
     */
    public static String sanitizeText(String input) {
        if (input == null || input.trim().isEmpty()) {
            return input;
        }
        return Jsoup.clean(input.trim(), Safelist.none());
    }

    /**
     * Allows safe basic formatting tags (b, i, em, strong, p, br, a) while removing scripts.
     */
    public static String sanitizeRichText(String input) {
        if (input == null || input.trim().isEmpty()) {
            return input;
        }
        return Jsoup.clean(input.trim(), Safelist.basic());
    }
}
