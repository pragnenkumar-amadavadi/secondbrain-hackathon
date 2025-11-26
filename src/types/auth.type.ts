import { EnterPriseToken } from "../constants";

export type EnterPriseTokenT = EnterPriseToken | null;

export type UserTokenT = string | null;

export type AuthStore = {
    enterpriseToken: EnterPriseTokenT;
    userToken: UserTokenT;
    setEnterpriseToken?: (token: EnterPriseTokenT) => void;
    setUserToken?: (token: UserTokenT) => void;
}