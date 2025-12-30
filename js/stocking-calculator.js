// Fish Stocking Calculator

// Fish database with bioload values (relative scale where 1 = low bioload small fish)
const fishDatabase = {
    // Community Fish
    neon_tetra: { name: 'Neon Tetra', size: 1, bioload: 0.5, schooling: true, minSchool: 6, tempMin: 72, tempMax: 78 },
    cardinal_tetra: { name: 'Cardinal Tetra', size: 1.5, bioload: 0.6, schooling: true, minSchool: 6, tempMin: 73, tempMax: 81 },
    guppy: { name: 'Guppy', size: 1.5, bioload: 0.7, schooling: false, tempMin: 72, tempMax: 82 },
    platy: { name: 'Platy', size: 2, bioload: 1, schooling: false, tempMin: 70, tempMax: 80 },
    molly: { name: 'Molly', size: 3, bioload: 1.5, schooling: false, tempMin: 72, tempMax: 82 },
    swordtail: { name: 'Swordtail', size: 4, bioload: 2, schooling: false, tempMin: 72, tempMax: 82 },
    harlequin_rasbora: { name: 'Harlequin Rasbora', size: 2, bioload: 0.8, schooling: true, minSchool: 6, tempMin: 72, tempMax: 80 },
    cherry_barb: { name: 'Cherry Barb', size: 2, bioload: 0.9, schooling: true, minSchool: 6, tempMin: 73, tempMax: 81 },
    corydoras: { name: 'Corydoras Catfish', size: 2, bioload: 1, schooling: true, minSchool: 6, tempMin: 72, tempMax: 78 },
    otocinclus: { name: 'Otocinclus', size: 1.5, bioload: 0.5, schooling: true, minSchool: 6, tempMin: 72, tempMax: 79 },

    // Larger Community
    angelfish: { name: 'Angelfish', size: 6, bioload: 4, schooling: false, tempMin: 76, tempMax: 84, note: 'Can be aggressive, needs tall tank' },
    pearl_gourami: { name: 'Pearl Gourami', size: 4, bioload: 2.5, schooling: false, tempMin: 77, tempMax: 82 },
    dwarf_gourami: { name: 'Dwarf Gourami', size: 3, bioload: 1.5, schooling: false, tempMin: 72, tempMax: 82 },
    rainbow_fish: { name: 'Rainbowfish', size: 4, bioload: 2, schooling: true, minSchool: 6, tempMin: 72, tempMax: 80 },
    bristlenose_pleco: { name: 'Bristlenose Pleco', size: 4, bioload: 2.5, schooling: false, tempMin: 72, tempMax: 80 },

    // Cichlids
    ram_cichlid: { name: 'German Blue Ram', size: 2.5, bioload: 1.5, schooling: false, tempMin: 78, tempMax: 85, note: 'Needs warm water' },
    apistogramma: { name: 'Apistogramma', size: 3, bioload: 1.5, schooling: false, tempMin: 72, tempMax: 82 },
    kribensis: { name: 'Kribensis', size: 4, bioload: 2, schooling: false, tempMin: 75, tempMax: 79 },
    firemouth: { name: 'Firemouth Cichlid', size: 6, bioload: 4, schooling: false, tempMin: 75, tempMax: 86, note: 'Semi-aggressive' },
    convict: { name: 'Convict Cichlid', size: 5, bioload: 3.5, schooling: false, tempMin: 68, tempMax: 80, note: 'Very aggressive when breeding' },

    // African Cichlids
    yellow_lab: { name: 'Yellow Lab', size: 5, bioload: 3, schooling: false, tempMin: 75, tempMax: 82, note: 'Needs hard water' },
    demasoni: { name: 'Demasoni', size: 3, bioload: 2, schooling: false, tempMin: 75, tempMax: 82, note: 'Very aggressive, needs overstocking' },
    peacock: { name: 'Peacock Cichlid', size: 5, bioload: 3, schooling: false, tempMin: 76, tempMax: 82 },
    frontosa: { name: 'Frontosa', size: 12, bioload: 10, schooling: false, tempMin: 75, tempMax: 81, note: 'Needs very large tank (125g+)' },

    // Goldfish
    fancy_goldfish: { name: 'Fancy Goldfish', size: 8, bioload: 8, schooling: false, tempMin: 65, tempMax: 75, note: 'Very high bioload, needs 20g first + 10g each additional' },
    comet_goldfish: { name: 'Comet Goldfish', size: 12, bioload: 12, schooling: false, tempMin: 60, tempMax: 74, note: 'Best in ponds, needs 50g+ each' },

    // Bettas & Labyrinth
    betta: { name: 'Betta', size: 2.5, bioload: 1.5, schooling: false, tempMin: 76, tempMax: 82, note: 'Males must be kept alone or with peaceful tankmates' },
    paradise_fish: { name: 'Paradise Fish', size: 3, bioload: 2, schooling: false, tempMin: 61, tempMax: 79, note: 'Can be aggressive' },

    // Larger Species
    common_pleco: { name: 'Common Pleco', size: 15, bioload: 15, schooling: false, tempMin: 72, tempMax: 82, note: 'Gets HUGE - needs 125g+' },
    oscar: { name: 'Oscar', size: 12, bioload: 12, schooling: false, tempMin: 74, tempMax: 81, note: 'Needs 75g minimum, very messy' },
    jack_dempsey: { name: 'Jack Dempsey', size: 10, bioload: 8, schooling: false, tempMin: 72, tempMax: 86, note: 'Aggressive' },
    blood_parrot: { name: 'Blood Parrot', size: 8, bioload: 6, schooling: false, tempMin: 76, tempMax: 80 },
    severum: { name: 'Severum', size: 8, bioload: 6, schooling: false, tempMin: 73, tempMax: 84 },

    // Schooling Fish
    zebra_danio: { name: 'Zebra Danio', size: 2, bioload: 0.8, schooling: true, minSchool: 6, tempMin: 64, tempMax: 77 },
    white_cloud: { name: 'White Cloud Minnow', size: 1.5, bioload: 0.5, schooling: true, minSchool: 6, tempMin: 60, tempMax: 72 },
    rummy_nose: { name: 'Rummy Nose Tetra', size: 2, bioload: 0.8, schooling: true, minSchool: 6, tempMin: 75, tempMax: 84 },
    emperor_tetra: { name: 'Emperor Tetra', size: 2, bioload: 0.9, schooling: true, minSchool: 6, tempMin: 73, tempMax: 81 },
    congo_tetra: { name: 'Congo Tetra', size: 3, bioload: 1.5, schooling: true, minSchool: 6, tempMin: 75, tempMax: 81 }
};

// Store current fish in tank
let currentFish = [];

// Parse URL params for tank volume
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const volumeParam = getUrlParam('volume');
    if (volumeParam) {
        document.getElementById('tankVolume').value = volumeParam;
    }
    updateStockingDisplay();
});

function addFish() {
    const speciesId = document.getElementById('fishSpecies').value;
    const quantity = parseInt(document.getElementById('fishQuantity').value) || 1;
    const fish = fishDatabase[speciesId];

    if (!fish) return;

    // Check if this species already exists in the tank
    const existingIndex = currentFish.findIndex(f => f.id === speciesId);

    if (existingIndex >= 0) {
        currentFish[existingIndex].quantity += quantity;
    } else {
        currentFish.push({
            id: speciesId,
            ...fish,
            quantity: quantity
        });
    }

    updateFishList();
    updateStockingDisplay();
}

function removeFish(index) {
    currentFish.splice(index, 1);
    updateFishList();
    updateStockingDisplay();
}

function updateFishQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        removeFish(index);
    } else {
        currentFish[index].quantity = newQuantity;
        updateFishList();
        updateStockingDisplay();
    }
}

function clearAllFish() {
    currentFish = [];
    updateFishList();
    updateStockingDisplay();
}

function updateFishList() {
    const listDiv = document.getElementById('fishList');

    if (currentFish.length === 0) {
        listDiv.innerHTML = `
            <div class="p-6 text-center text-gray-500">
                No fish added yet. Select species above and click "Add to Tank"
            </div>
        `;
        return;
    }

    let html = '';
    currentFish.forEach((fish, index) => {
        const totalBioload = (fish.bioload * fish.quantity).toFixed(1);
        const schoolWarning = fish.schooling && fish.quantity < fish.minSchool;

        html += `
            <div class="fish-item">
                <div class="flex-1">
                    <div class="font-semibold text-gray-800">${fish.name}</div>
                    <div class="text-sm text-gray-500">${fish.size}" adult size | Bioload: ${totalBioload}</div>
                    ${schoolWarning ? `<div class="text-sm text-orange-600">Needs ${fish.minSchool}+ for a school</div>` : ''}
                    ${fish.note ? `<div class="text-sm text-blue-600">${fish.note}</div>` : ''}
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="updateFishQuantity(${index}, ${fish.quantity - 1})" class="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200">-</button>
                    <span class="w-8 text-center font-semibold">${fish.quantity}</span>
                    <button onclick="updateFishQuantity(${index}, ${fish.quantity + 1})" class="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200">+</button>
                    <button onclick="removeFish(${index})" class="ml-2 text-red-500 hover:text-red-700">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    });

    listDiv.innerHTML = html;
}

function updateStockingDisplay() {
    const resultsDiv = document.getElementById('stockingResults');
    const tankVolume = parseFloat(document.getElementById('tankVolume').value) || 0;
    const filtrationMultiplier = parseFloat(document.getElementById('filtration').value) || 1;
    const tankType = document.getElementById('tankType').value;
    const experienceMultiplier = parseFloat(document.getElementById('experience').value) || 1;

    if (tankVolume <= 0 || currentFish.length === 0) {
        resultsDiv.innerHTML = `
            <div class="text-center py-8">
                <div class="stocking-meter mb-4">
                    <div class="stocking-fill understocked" style="width: 0%"></div>
                </div>
                <p class="text-gray-500">Add tank size and fish to see stocking level</p>
            </div>
        `;
        return;
    }

    // Calculate total bioload
    let totalBioload = 0;
    let totalFish = 0;
    let warnings = [];

    currentFish.forEach(fish => {
        totalBioload += fish.bioload * fish.quantity;
        totalFish += fish.quantity;

        // Check for schooling requirements
        if (fish.schooling && fish.quantity < fish.minSchool) {
            warnings.push(`${fish.name} needs ${fish.minSchool}+ to school properly`);
        }
    });

    // Calculate tank capacity based on various factors
    // Base: 1 bioload unit per gallon
    let tankCapacity = tankVolume;

    // Adjust for filtration
    tankCapacity *= filtrationMultiplier;

    // Adjust for tank type
    if (tankType === 'planted') tankCapacity *= 1.15; // Plants help
    if (tankType === 'cichlid') tankCapacity *= 1.2; // Overstocking is common/necessary
    if (tankType === 'goldfish') tankCapacity *= 0.7; // Very messy fish

    // Adjust for experience
    tankCapacity *= experienceMultiplier;

    // Calculate stocking percentage
    const stockingPercent = (totalBioload / tankCapacity) * 100;

    // Determine status
    let status, statusClass, statusMessage, fillClass;

    if (stockingPercent < 50) {
        status = 'Understocked';
        statusClass = 'text-green-600';
        fillClass = 'understocked';
        statusMessage = 'Room for more fish. Consider adding to schools or introducing new species.';
    } else if (stockingPercent < 75) {
        status = 'Lightly Stocked';
        statusClass = 'text-green-600';
        fillClass = 'understocked';
        statusMessage = 'Good stocking level. Stable and easy to maintain.';
    } else if (stockingPercent < 100) {
        status = 'Well Stocked';
        statusClass = 'text-blue-600';
        fillClass = 'optimal';
        statusMessage = 'Optimal stocking. Keep up with regular maintenance.';
    } else if (stockingPercent < 120) {
        status = 'Moderately Heavy';
        statusClass = 'text-yellow-600';
        fillClass = 'moderate';
        statusMessage = 'Slightly heavy. Requires excellent filtration and regular water changes.';
    } else {
        status = 'Overstocked';
        statusClass = 'text-red-600';
        fillClass = 'overstocked';
        statusMessage = 'Too many fish! Consider rehoming some or upgrading your tank.';
    }

    // Build warnings HTML
    let warningsHtml = '';
    if (warnings.length > 0) {
        warningsHtml = `
            <div class="mt-4 warning-box">
                <h4 class="font-semibold text-yellow-800 mb-2">Warnings</h4>
                <ul class="text-sm text-yellow-700 space-y-1">
                    ${warnings.map(w => `<li>- ${w}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    resultsDiv.innerHTML = `
        <div class="text-center mb-4">
            <div class="text-4xl font-bold ${statusClass}">${Math.round(stockingPercent)}%</div>
            <div class="text-lg font-semibold ${statusClass}">${status}</div>
        </div>

        <div class="stocking-meter mb-4">
            <div class="stocking-fill ${fillClass}" style="width: ${Math.min(100, stockingPercent)}%"></div>
        </div>

        <p class="text-gray-600 text-sm mb-4">${statusMessage}</p>

        <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="bg-gray-50 p-3 rounded-lg">
                <div class="text-gray-500">Total Fish</div>
                <div class="font-bold text-lg">${totalFish}</div>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
                <div class="text-gray-500">Total Bioload</div>
                <div class="font-bold text-lg">${totalBioload.toFixed(1)}</div>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
                <div class="text-gray-500">Tank Capacity</div>
                <div class="font-bold text-lg">${tankCapacity.toFixed(1)}</div>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
                <div class="text-gray-500">Remaining</div>
                <div class="font-bold text-lg">${Math.max(0, tankCapacity - totalBioload).toFixed(1)}</div>
            </div>
        </div>

        ${warningsHtml}

        <div class="mt-6 pt-4 border-t">
            <h4 class="font-semibold text-gray-800 mb-2">Recommended Maintenance</h4>
            <ul class="text-sm text-gray-600 space-y-1">
                ${stockingPercent > 80 ? '<li>Water change: 25-30% weekly</li>' : '<li>Water change: 20% weekly</li>'}
                ${stockingPercent > 100 ? '<li>Consider upgrading filtration</li>' : ''}
                <li>Test water weekly for ammonia, nitrite, nitrate</li>
            </ul>
        </div>
    `;
}

// Add event listeners for real-time updates
document.addEventListener('DOMContentLoaded', function() {
    ['tankVolume', 'filtration', 'tankType', 'experience'].forEach(id => {
        document.getElementById(id).addEventListener('change', updateStockingDisplay);
        document.getElementById(id).addEventListener('input', updateStockingDisplay);
    });
});
