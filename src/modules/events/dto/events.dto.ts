export class EventFromWebsiteDto {
  id: number;
  title: string;
}

export class CanceledRegistration {
  message: string;
}

export class CreatedRegistration {
  message: string;
  keyID: string;
}
