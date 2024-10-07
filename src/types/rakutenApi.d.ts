export interface RakutenBooksAPIResponse {
  GenreInformation: any[]
  Items: RakutenBookItem[]
  carrier: number
  count: number
  first: number
  hits: number
  last: number
  page: number
  pageCount: number
}

export interface RakutenBookItem {
  Item: {
    affiliateUrl: string
    artistName: string
    author: string
    availability: string
    booksGenreId: string
    chirayomiUrl: string
    discountPrice: number
    discountRate: number
    hardware: string
    isbn: string
    itemCaption: string
    itemPrice: number
    itemUrl: string
    jan: string
    label: string
    largeImageUrl: string
    limitedFlag: number
    listPrice: number
    mediumImageUrl: string
    os: string
    postageFlag: number
    publisherName: string
    reviewAverage: string
    reviewCount: number
    salesDate: string
    smallImageUrl: string
    title: string
  }
}
