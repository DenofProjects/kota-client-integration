export class EndPoints {
    public static readonly BASE_URL_SHEET = "https://sheetdb.io/api/v1/2ibxtf5r7x04h";
    // let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080/"
    public static readonly BASE_URL = process.env.NODE_ENV === "production" ? "/api/v1" : "http://localhost:3001/api/v1";
    public static readonly SEND_MAIL_ON_SUBMIT = "/sendEmail";
    public static readonly HEALTH_CHECK = "/health";
}