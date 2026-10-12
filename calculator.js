(function () {
    "use strict";


    /* =====================================================
       PRODUCT LINKS
    ===================================================== */

    const PRODUCTS = {

        halfMetre:
            "https://gabionfabrication.com.au/products/galfan%C2%AE-welded-mesh-gabion-kit-0-5m-high-x-0-5m-wide-x-0-5m-long",

        oneMetre:
            "https://gabionfabrication.com.au/products/galfan%C2%AE-welded-mesh-gabion-kit-0-5m-wide-x-1m-high-x-2m-long",

        oneWide:
            "https://gabionfabrication.com.au/products/galfan%C2%AE-welded-mesh-gabion-kit-0-5m-high-x-1-0m-wide-x-1-0m-long-copy",

        large:
            "https://gabionfabrication.com.au/products/galfan%C2%AE-welded-mesh-gabion-kit-1-0m-high-x-1-0m-wide-x-1-0m-long-copy",

        geotextile:
            "https://gabionfabrication.com.au/products/geotextile-roll-1-2m-x-50m"
    };


    /* =====================================================
       PRICES
    ===================================================== */

    const PRICE = {

        kit05PerMetre: 94,

        kit10PerMetre: 170,

        stonePerM3: 116,

        stonePer500LiftPerMetre: 0.25,

        limestonePerBlock: 120,

        geotextileRollLength: 50
    };


    /* =====================================================
       HEIGHT LOGIC
    ===================================================== */

    const GABION_HEIGHTS = {

        "0.5": {
            displayedLifts: 1,
            stoneLifts: 1,
            calculatorRate: PRICE.kit05PerMetre
        },

        "1": {
            displayedLifts: 1,
            stoneLifts: 2,
            calculatorRate: PRICE.kit10PerMetre
        },

        "1.5": {
            displayedLifts: 3,
            stoneLifts: 3,
            calculatorRate:
                PRICE.kit05PerMetre * 3
        },

        "2": {
            displayedLifts: 4,
            stoneLifts: 4,
            calculatorRate:
                PRICE.kit05PerMetre * 4
        },

        "2.5": {
            displayedLifts: 5,
            stoneLifts: 5,
            calculatorRate:
                PRICE.kit05PerMetre * 5
        },

        "3": {
            displayedLifts: 6,
            stoneLifts: 6,
            calculatorRate:
                PRICE.kit05PerMetre * 6
        }
    };


    /* =====================================================
       LIMESTONE
    ===================================================== */

    const LIMESTONE = {

        "0.5": {
            min: 3,
            max: 4
        },

        "1": {
            min: 5,
            max: 5
        },

        "1.5": {
            min: 10,
            max: 11
        },

        "2": {
            min: 14,
            max: 15
        },

        "2.5": {
            min: 18,
            max: 20
        },

        "3": {
            min: 24,
            max: 26
        }
    };


    /* =====================================================
       STATE
    ===================================================== */

    let wallLength = 12;
    let wallHeight = "1";


    /* =====================================================
       HELPERS
    ===================================================== */

    function root() {

        return document.getElementById(
            "gf-calculator"
        );
    }


    function get(selector) {

        const calculator =
            root();

        return calculator
            ? calculator.querySelector(selector)
            : null;
    }


    function getAll(selector) {

        const calculator =
            root();

        return calculator
            ? Array.from(
                calculator.querySelectorAll(selector)
              )
            : [];
    }


    function money(value) {

        return "$" +
            Math.round(value)
                .toLocaleString(
                    "en-AU"
                );
    }


    function moneyRange(
        minimum,
        maximum
    ) {

        if (
            Math.round(minimum) ===
            Math.round(maximum)
        ) {

            return money(
                minimum
            );
        }

        return (
            money(minimum) +
            " – " +
            money(maximum)
        );
    }


    /* =====================================================
       PRODUCT LINK
    ===================================================== */

    function updateProductLink() {

        const button =
            get("#gf-add-cart");

        if (!button) {
            return;
        }


        if (
            wallHeight === "1"
        ) {

            button.href =
                PRODUCTS.oneMetre;

        } else {

            button.href =
                PRODUCTS.halfMetre;
        }
    }


    /* =====================================================
       CALCULATE
    ===================================================== */

    function calculate() {

        const calculator =
            root();

        if (!calculator) {
            return;
        }


        const lengthInput =
            get("#gf-length");


        if (lengthInput) {

            wallLength =
                Number(
                    lengthInput.value
                ) || 1;
        }


        const activeHeight =
            get(
                ".gf-height-btn.active"
            );


        if (activeHeight) {

            wallHeight =
                String(
                    activeHeight.dataset.height
                );
        }


        const gabion =
            GABION_HEIGHTS[
                wallHeight
            ];


        const limestone =
            LIMESTONE[
                wallHeight
            ];


        if (
            !gabion ||
            !limestone
        ) {
            return;
        }


        /* =================================================
           GABION
        ================================================= */

        const kitCost =
            wallLength *
            gabion.calculatorRate;


        const stoneVolume =
            wallLength *
            gabion.stoneLifts *
            PRICE.stonePer500LiftPerMetre;


        const stoneCost =
            stoneVolume *
            PRICE.stonePerM3;


        const gabionTotal =
            kitCost +
            stoneCost;


        const gabionPerMetre =
            gabionTotal /
            wallLength;


        const geotextileRolls =
            Math.ceil(
                wallLength /
                PRICE.geotextileRollLength
            );


        /* =================================================
           LIMESTONE
        ================================================= */

        const minimumBlocks =
            wallLength *
            limestone.min;


        const maximumBlocks =
            wallLength *
            limestone.max;


        const minimumLimestoneCost =
            minimumBlocks *
            PRICE.limestonePerBlock;


        const maximumLimestoneCost =
            maximumBlocks *
            PRICE.limestonePerBlock;


        /* =================================================
           SAVINGS
        ================================================= */

        const minimumSaving =
            Math.max(
                0,
                minimumLimestoneCost -
                gabionTotal
            );


        const maximumSaving =
            Math.max(
                0,
                maximumLimestoneCost -
                gabionTotal
            );


        const minimumPercent =
            minimumLimestoneCost > 0

            ? Math.round(
                (
                    minimumSaving /
                    minimumLimestoneCost
                ) * 100
            )

            : 0;


        const maximumPercent =
            maximumLimestoneCost > 0

            ? Math.round(
                (
                    maximumSaving /
                    maximumLimestoneCost
                ) * 100
            )

            : 0;


        /* =================================================
           UI
        ================================================= */

        const lengthDisplay =
            get("#gf-length-display");

        const buildType =
            get("#gf-build-type");

        const liftsDisplay =
            get("#gf-lifts");

        const kitCostDisplay =
            get("#gf-kit-cost");

        const stoneLabel =
            get("#gf-stone-label");

        const stoneCostDisplay =
            get("#gf-stone-cost");

        const perMetreDisplay =
            get("#gf-per-metre");

        const gabionTotalDisplay =
            get("#gf-gabion-total");

        const geotextileDisplay =
            get("#gf-geotextile");

        const cartKitDisplay =
            get("#gf-cart-kit");

        const cartGeotextileDisplay =
            get("#gf-cart-geotextile");

        const blocksDisplay =
            get("#gf-blocks");

        const limestoneTotalDisplay =
            get("#gf-limestone-total");

        const savingDisplay =
            get("#gf-saving");

        const percentDisplay =
            get("#gf-percent");


        /* LENGTH */

        if (lengthDisplay) {

            lengthDisplay.textContent =
                wallLength +
                (
                    wallLength === 1
                    ? " metre"
                    : " metres"
                );
        }


        /* BUILD */

        if (
            wallHeight === "0.5"
        ) {

            if (buildType) {
                buildType.textContent =
                    "1 × 0.5m high kit";
            }

            if (cartKitDisplay) {
                cartKitDisplay.textContent =
                    "0.5m high × " +
                    wallLength +
                    "m";
            }

        }

        else if (
            wallHeight === "1"
        ) {

            if (buildType) {
                buildType.textContent =
                    "1 × 1.0m high kit";
            }

            if (cartKitDisplay) {
                cartKitDisplay.textContent =
                    "1.0m high × " +
                    wallLength +
                    "m";
            }

        }

        else {

            if (buildType) {

                buildType.textContent =
                    gabion.displayedLifts +
                    " × 500mm lifts";
            }

            if (cartKitDisplay) {

                cartKitDisplay.textContent =
                    gabion.displayedLifts +
                    " × 500mm lifts × " +
                    wallLength +
                    "m";
            }
        }


        if (liftsDisplay) {

            liftsDisplay.textContent =
                gabion.displayedLifts;
        }


        if (kitCostDisplay) {

            kitCostDisplay.textContent =
                money(
                    kitCost
                );
        }


        if (stoneLabel) {

            stoneLabel.textContent =
                "Stone (~" +
                stoneVolume.toFixed(2) +
                " m³)";
        }


        if (stoneCostDisplay) {

            stoneCostDisplay.textContent =
                money(
                    stoneCost
                );
        }


        if (perMetreDisplay) {

            perMetreDisplay.textContent =
                money(
                    gabionPerMetre
                );
        }


        if (gabionTotalDisplay) {

            gabionTotalDisplay.textContent =
                money(
                    gabionTotal
                );
        }


        if (geotextileDisplay) {

            geotextileDisplay.textContent =
                geotextileRolls +
                (
                    geotextileRolls === 1
                    ? " roll"
                    : " rolls"
                );
        }


        if (cartGeotextileDisplay) {

            cartGeotextileDisplay.textContent =
                geotextileRolls +
                (
                    geotextileRolls === 1
                    ? " × 50m roll"
                    : " × 50m rolls"
                );
        }


        if (blocksDisplay) {

            blocksDisplay.textContent =
                minimumBlocks ===
                maximumBlocks

                ? minimumBlocks +
                  " blocks"

                : minimumBlocks +
                  " – " +
                  maximumBlocks +
                  " blocks";
        }


        if (limestoneTotalDisplay) {

            limestoneTotalDisplay.textContent =
                moneyRange(
                    minimumLimestoneCost,
                    maximumLimestoneCost
                );
        }


        if (savingDisplay) {

            savingDisplay.textContent =
                moneyRange(
                    minimumSaving,
                    maximumSaving
                );
        }


        if (percentDisplay) {

            percentDisplay.textContent =
                minimumPercent ===
                maximumPercent

                ? minimumPercent +
                  "%"

                : minimumPercent +
                  "% – " +
                  maximumPercent +
                  "%";
        }


        updateProductLink();
    }


    /* =====================================================
       GHL-SAFE EVENTS
    ===================================================== */

    if (
        !window.__GF_EVENTS_BOUND__
    ) {

        window.__GF_EVENTS_BOUND__ =
            true;


        document.addEventListener(
            "input",
            function(event) {

                if (
                    event.target &&
                    event.target.id ===
                    "gf-length"
                ) {

                    wallLength =
                        Number(
                            event.target.value
                        ) || 1;


                    calculate();
                }
            },
            true
        );


        document.addEventListener(
            "click",
            function(event) {

                const target =
                    event.target;


                if (
                    !target ||
                    typeof target.closest !==
                    "function"
                ) {
                    return;
                }


                const button =
                    target.closest(
                        "#gf-calculator .gf-height-btn"
                    );


                if (!button) {
                    return;
                }


                event.preventDefault();


                getAll(
                    ".gf-height-btn"
                )
                .forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );
                    }
                );


                button.classList.add(
                    "active"
                );


                wallHeight =
                    String(
                        button.dataset.height
                    );


                calculate();
            },
            true
        );
    }


    /* =====================================================
       GHL HYDRATION
    ===================================================== */

    function refresh() {

        requestAnimationFrame(
            function() {

                calculate();
            }
        );
    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            refresh,
            {
                once: true
            }
        );

    } else {

        refresh();
    }


    document.addEventListener(
        "hydrationDone",
        function() {

            setTimeout(
                refresh,
                50
            );

            setTimeout(
                refresh,
                300
            );
        }
    );


    window.addEventListener(
        "load",
        function() {

            setTimeout(
                refresh,
                100
            );
        },
        {
            once: true
        }
    );


    setTimeout(
        refresh,
        500
    );

    setTimeout(
        refresh,
        1500
    );

    setTimeout(
        refresh,
        3000
    );

})();