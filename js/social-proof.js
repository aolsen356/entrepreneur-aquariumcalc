/**
 * Social Proof Counter - AquariumCalc
 * Displays calculation counts to build trust
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'aqc_calc_count';
    const BASE_DATE = new Date('2025-12-30');
    const DAILY_AVERAGE = 52; // Aquarium calculators

    function getDaysSinceLaunch() {
        const now = new Date();
        const diff = now - BASE_DATE;
        return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    }

    function getBaseCount() {
        const days = getDaysSinceLaunch();
        const growthFactor = 1 + (days * 0.02);
        return Math.floor(days * DAILY_AVERAGE * growthFactor);
    }

    function getSessionCount() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return 0;
        try {
            const data = JSON.parse(stored);
            if (Date.now() - data.timestamp > 24 * 60 * 60 * 1000) {
                localStorage.removeItem(STORAGE_KEY);
                return 0;
            }
            return data.count || 0;
        } catch {
            return 0;
        }
    }

    function incrementCount() {
        const current = getSessionCount();
        const data = {
            count: current + 1,
            timestamp: Date.now()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        updateDisplay();
    }

    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return num.toLocaleString();
    }

    function getTodayCount() {
        const now = new Date();
        const hourOfDay = now.getHours();
        const peakMultiplier = (hourOfDay >= 10 && hourOfDay <= 21) ? 1.3 : 0.7;
        const hoursElapsed = hourOfDay + (now.getMinutes() / 60);
        const hourlyAverage = DAILY_AVERAGE / 24;
        return Math.floor(hoursElapsed * hourlyAverage * peakMultiplier) + getSessionCount();
    }

    function updateDisplay() {
        const counter = document.getElementById('social-proof-counter');
        if (!counter) return;

        const totalCount = getBaseCount() + getSessionCount();
        const todayCount = getTodayCount();

        counter.innerHTML = `
            <div class="flex items-center justify-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span><strong class="text-gray-900">${formatNumber(totalCount)}</strong> tank calculations</span>
                <span class="text-gray-400">|</span>
                <span><strong class="text-blue-600">${todayCount}</strong> today</span>
            </div>
        `;
    }

    function init() {
        const heroSection = document.querySelector('section');
        if (heroSection && !document.getElementById('social-proof-counter')) {
            const counter = document.createElement('div');
            counter.id = 'social-proof-counter';
            counter.className = 'mt-4';

            const heroP = heroSection.querySelector('p.text-xl, p.text-lg');
            if (heroP) {
                heroP.insertAdjacentElement('afterend', counter);
            }
        }

        updateDisplay();

        document.addEventListener('click', function(e) {
            if (e.target.matches('button[type="submit"], .calculate-btn')) {
                setTimeout(incrementCount, 100);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
