import 'little-state-machine';

declare module 'little-state-machine' {
  interface GlobalState {
    currentStep: number,
    plaid: {
      linkStatus: boolean,
      itemId: string,
      accessToken: string,
      isItemAccess: boolean,
      linkToken: string,
      isPaymentInitiation: boolean,
      backend: boolean
    },
    step1: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      terms: boolean;
    };
    step2: {
      revenue: string;
    };
    step3: {
      employees: string;
    };
    step4: {
      financing: string;
    };
    step5: {
      expectation: number;
    };
    step6: {
      businessName: string;
      dbaName: string;
      businessType: string;
      formationState: string;
      businessStreet: string;
      businessCity: string;
      businessState: string;
      businessZip: string;
      industry: string;
      annualSales: string;
      startDate: string;
      eIn: string;
      own: string;
      moPayment: string;
      moExpenses: string;
      leins: string;
      organizationNumber: string;
      collateral: string;
      statements: boolean;
      businessEmail: string;
      businessPhoneNumber: string;
    },
    step7: {
      legalFirstName: string,
      legalLastName: string,
      ssn: string,
      dateBirth: string,
      ownerStreet: string,
      ownerCity: string,
      ownerState: string,
      ownerZip: string,
      annualIncome: string,
      ownOrRentHome: string,
      moPaymentHome: string,
      personalSign: string,
      financialLeins: string,
      organizationNumber: string,
      personalCollateral: string,
      ownerName: string,
      date: string,
      policy: boolean
    }
  }
}