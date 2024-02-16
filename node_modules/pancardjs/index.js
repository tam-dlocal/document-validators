(function (global, factory) {
    // eslint-disable-next-line no-nested-ternary,no-unused-expressions
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory()
        // eslint-disable-next-line no-undef
        : typeof define === 'function' && define.amd ? define(factory)
            // eslint-disable-next-line no-param-reassign,no-restricted-globals
            : (global = global || self, global.isValid = factory());
}(this, () => {
    const REGX = {
        PAN: /^[A-Z]{5}\d{4}[A-Z]$/,
    };
    const PAN_HOLDER = {
        A: 'Association Of Persons (AOP)',
        B: 'Body Of Individuals (BOI)',
        C: 'Company',
        F: 'Firm',
        G: 'Government',
        H: 'Hindu Undivided Family (HUF)',
        L: 'Local Authority',
        J: 'Artificial Juridical Person',
        P: 'Individual (Proprietor)',
        T: 'Trust (AOP)',
        E: 'Limited Liability Partnership (LLP)',
    };
    const pan = (panNo) => {
        if (panNo.length === 10 && REGX.PAN.test(panNo.toUpperCase())) {
            const panTypes = ['A', 'B', 'C', 'F', 'G', 'H', 'L', 'J', 'P', 'T', 'E'];
            return panTypes.includes(panNo[3].toUpperCase());
        }
        return false;
    };
    pan.holder = (panNo) => {
        if (panNo.length !== 10 || !REGX.PAN.test(panNo.toUpperCase())) throw Error('Invalid PAN Format');
        return PAN_HOLDER[panNo[3].toUpperCase()] || 'UNKNOWN';
    };
    const isValid = {
        pan
    };

    return isValid;
}));
