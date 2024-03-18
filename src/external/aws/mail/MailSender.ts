import AwsCredentialsSingleton from "../AwsCredentialsSingleton";
import {SendEmailCommand} from "@aws-sdk/client-ses";


export default class MailSender {

    public static async sendEmail(title: string, htmlBody: string, txtBody: string, from: string, to: Array<string>): Promise<void> {
        const client = AwsCredentialsSingleton.getInstance().getSESClient();
        const command = new SendEmailCommand({
            Message: {
                Subject: {
                    Data: title,
                },
                Body: {
                    Html: {
                        Data: htmlBody
                    },
                    Text: {
                        Data: txtBody
                    }
                }
            },
            Destination: {
                ToAddresses: to
            },
            Source: from
        });

        try {
            await client.send(command);
            console.log(`sending email from ${from}: Title "${title}"`);
        } catch (exception) {
            console.error(exception);
        }
    }
}