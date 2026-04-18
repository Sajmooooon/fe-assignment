/**
 * Email Validation API
 */

import { CONFIG } from "../config.js";

/**
 * Validate email endpoint
 * Returns success if email contains @riesenia.com
 *
 * @param {string} email - Email address to validate
 * @returns {Promise<{success: boolean, message: string, email: string}>}
 */
let controller = null;
export const validateEmail = async (email) => {
    if (controller) {
        controller.abort();
    }

    controller = new AbortController();

    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/validate-email`, {
            signal: controller.signal,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name === "AbortError") return;
        console.error("💥 Error:", error);

        return {
            success: false,
            message: "Network error: Unable to reach validation server",
            email,
        };
    }
};
