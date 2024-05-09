import AwsCredentialsSingleton from "../AwsCredentialsSingleton";
import {SendEmailCommand} from "@aws-sdk/client-ses";


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
            await this.sendEmailProd();
        } else {
            await this.sendEmailLocal();
        }
    }

    private async sendEmailLocal(): Promise<void> {
        const mails = this.to.toString();
        console.log(`mail local: [${this.title}] de [${this.from}] vers [${mails}] avec contenu \n ${this.htmlBody}`);
    }

    private async sendEmailProd(): Promise<void> {
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
                ToAddresses: this.to
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