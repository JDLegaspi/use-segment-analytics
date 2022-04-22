"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentProvider = exports.useSegmentTracking = exports.analyticsContext = void 0;
const analytics_next_1 = require("@segment/analytics-next");
const react_1 = __importStar(require("react"));
exports.analyticsContext = (0, react_1.createContext)(null);
const useSegmentTracking = () => {
    const maybeContext = (0, react_1.useContext)(exports.analyticsContext);
    if (maybeContext == null) {
        throw new Error("Did you forget to define an <SegmentProvider /> ?");
    }
    return maybeContext;
};
exports.useSegmentTracking = useSegmentTracking;
const SegmentProvider = ({ apiKey, children, }) => {
    const [analytics, setAnalytics] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const loadAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [response] = yield analytics_next_1.AnalyticsBrowser.load({
                    writeKey: apiKey,
                });
                setAnalytics(response);
            }
            catch (e) {
                console.error("Error loading analytics client:", e);
            }
        });
        loadAnalytics();
    }, [apiKey]);
    const contextState = (0, react_1.useMemo)(() => analytics, [analytics]);
    return (react_1.default.createElement(exports.analyticsContext.Provider, { value: contextState }, children));
};
exports.SegmentProvider = SegmentProvider;
//# sourceMappingURL=context.js.map