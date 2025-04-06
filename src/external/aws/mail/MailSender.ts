import AwsCredentialsSingleton from "../AwsCredentialsSingleton";
import {GetSendQuotaCommand, SendEmailCommand} from "@aws-sdk/client-ses";
import Sleeper from "../../../business/utils/Sleeper";


export default class MailSender {
    private readonly title: string;
    private readonly htmlBody: string;
    private readonly txtBody: string;
    private readonly from: string;
    private readonly to: Array<string>;

    constructor(title: string, htmlBody: string, txtBody: string, from: string, to: Array<string>) {
        this.title = title;
        this.htmlBody = htmlBody;
        this.txtBody = txtBody;
        this.from = from;
        this.to = to;
    }

    public async sendMail(): Promise<void> {
        if (process.env.NODE_ENV === 'production') {
            await this.sendSeriesProd();
        } else {
            await this.sendSeriesLocal();
        }
    }

    private async sendSeriesProd(): Promise<void> {
        const client = AwsCredentialsSingleton.getInstance().getSESClient();

        const command = new GetSendQuotaCommand({});
        const response = await client.send(command);

        if (response.SentLast24Hours + this.to.length > response.Max24HourSend) {
            console.log(`Max day quota reached: ${response.Max24HourSend}. Operation aborted`);
            return;
        }

        for (const email of this.to) {
            await this.sendEmailProd(email);
            await new Sleeper().sleep(100);
        }
    }

    private async sendSeriesLocal(): Promise<void> {
        for (const email of this.to) {
            await this.sendEmailLocal(email);
            await new Sleeper().sleep(100);
        }
    }

    private async sendEmailLocal(email: string): Promise<void> {
        console.log(`mail local: [${this.title}] de [${this.from}] vers [${email}] avec contenu \n ${this.htmlBody}`);
    }

    private async sendEmailProd(email: string): Promise<void> {
        const client = AwsCredentialsSingleton.getInstance().getSESClient();
        const command = new SendEmailCommand({
            Message: {
                Subject: {
                    Data: this.title,
                },
                Body: {
                    Html: {
                        Data: this.htmlBody
                    },
                    Text: {
                        Data: this.txtBody
                    }
                }
            },
            Destination: {
                ToAddresses: [email]
            },
            Source: this.from
        });

        try {
            await client.send(command);
            console.log(`sending email from ${this.from}: Title "${this.title}"`);
        } catch (exception) {
            console.error(exception);
        }
    }
}