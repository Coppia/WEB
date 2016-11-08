export class CustomerLookup {
  person: {
    id: string;
    name: {
      fullName: string;
      givenName: string;
      familyName: string;
    };
    email: string;
    gender: string;
    location: string;
    timeZone: string;
    utcOffset: number;
    geo: {
      city: string;
      state:  string;
      stateCode:  string;
      country:  string;
      countryCode:  string;
      lat: number;
      lng: number;
    };
    bio:  string;
    site:  string;
    avatar:  string;
    employment: {
      domain:  string;
      name:  string;
      title:  string;
      role:  string;
      seniority:  string;
    };
    facebook: {
      handle:  string;
    };
    github: {
      handle:  string;
      id:  string;
      avatar:  string;
      company:  string;
      blog:  string;
      followers:  string;
      following:  string;
    };
    twitter: {
      handle:  string;
      id: number;
      bio:  string;
      followers: number;
      following: number;
      statuses: number;
      favorites: number;
      location:  string;
      site:  string;
      avatar:  string;
    };
    linkedin: {
      handle:  string;
    };
    googleplus: {
      handle:  string;
    };
    aboutme: {
      handle:  string;
      bio:  string;
      avatar:  string;
    };
    gravatar: {
      handle:  string;
      urls: string[];
      avatar:  string;
      avatars: string[];
    };
    fuzzy: boolean;
    emailProvider: boolean;
  };
  company:  {
    id:  string;
    name:  string;
    legalName:  string;
    domain:  string;
    domainAliases: string[];
    url:  string;
    site: {
      url:  string;
      title:  string;
      h1:  string;
      metaDescription:  string;
      metaAuthor:  string;
      phoneNumbers: string[];
      emailAddresses: string[];
    };
    category: {
      sector:  string;
      industryGroup:  string;
      industry:  string;
      subIndustry:  string;
    };
    tags: string[];
    description:  string;
    foundedYear: number;
    location:  string;
    timeZone:  string;
    utcOffset: number;
    geo: {
      streetNumber:  string;
      streetName:  string;
      subPremise:  string;
      city:  string;
      postalCode:  string;
      state:  string;
      stateCode:  string;
      country:  string;
      countryCode:  string;
      lat: number;
      lng: number;
    };
    logo:  string;
    facebook: {
      handle:  string;
    };
    inkedin: {
      handle:  string;
    };
    twitter: {
      handle:  string;
      id:  string;
      bio:  string;
      followers: number;
      following: number;
      location:  string;
      site:  string;
      avatar:  string;
    };
    crunchbase: {
      handle:  string;
    };
    emailProvider: boolean;
    type:  string;
    ticker:  any;
    phone:  string;
    metrics: {
      alexaUsRank: number;
      alexaGlobalRank: number;
      googleRank: number;
      employees: number;
      employeesRange:  string;
      marketCap:  any;
      raised: number;
      annualRevenue: any;
    };
    tech: string[];
  };
}
