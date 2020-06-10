import {Injectable} from '@nestjs/common';
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {QuoteResponse, Quote} from './quotes.types';

@Injectable()
export class QuotesService {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: 'http://api.forismatic.com/api/1.0/',
    });
  }

  public async getQuoteString() {
    const quote = await this.getQuote();
    return this.buildQuoteString(quote);
  }

  public buildQuoteString({text, author}: {text: string; author: string}) {
    if (text[text.length - 1] === '.') {
      text = text.slice(0, text.length - 1);
    }
    return `❗️${text}❗️️️${author ? '\n\n' : ''}${author}©️`;
  }

  public async getQuote(): Promise<Quote> {
    const response: AxiosResponse<QuoteResponse> = await this.api({
      method: 'POST',
      params: this.buildGetQuoteParams(),
    });

    return this.mapQuoteResponseToQuote(response.data);
  }

  private mapQuoteResponseToQuote(quoteResponse: QuoteResponse): Quote {
    return {
      text: quoteResponse.quoteText,
      author: quoteResponse.quoteAuthor,
    };
  }

  // @See https://forismatic.com/ru/api
  private buildGetQuoteParams() {
    return {
      method: 'getQuote',
      format: 'json',
      lang: 'ru',
    };
  }
}
