import InternalizationVM from "../viewmodels/InternalizationVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import InternalizationParser from "../parsers/InternalizationParser.ts";

export default class InternalizationRequester {
    public static async getInternalizationMessages(): Promise<Array<InternalizationVM>> {
        const response = await axiosServer.get('/internalizationMessages');
        return InternalizationParser.parseInternalizationMessages(response.data);
    }
}