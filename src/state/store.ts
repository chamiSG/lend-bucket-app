import { createStore, GlobalState } from 'little-state-machine';
const initialState = {
  currentStep: 0,
  plaid: {
    linkStatus: false,
    itemId: '',
    accessToken: '',
    isItemAccess: false,
    linkToken: '',
    isPaymentInitiation: false,
    backend: false
  },
  step1: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    terms: false,
  },
  step2: {
    revenue: '',
  },
  step3: {
    employees: '',
  },
  step4: {
    financing: '',
  },
  step5: {
    expectation: 100,
  },
  step6: {
    businessName: '',
    dbaName: '',
    businessType: '',
    formationState: '',
    businessStreet: '',
    businessCity: '',
    businessState: '',
    businessZip: '',
    industry: '',
    annualSales: '',
    startDate: '',
    eIn: '',
    own: '',
    moPayment: '',
    moExpenses: '',
    leins: '',
    organizationNumber: '',
    collateral: '',
    statements: false,
    businessEmail: '',
    businessPhoneNumber: '',
  },
  step7: {
    legalFirstName: '',
    legalLastName: '',
    ssn: '',
    dateBirth: '',
    ownerStreet: '',
    ownerCity: '',
    ownerState: '',
    ownerZip: '',
    annualIncome: '',
    ownOrRentHome: '',
    moPaymentHome: '',
    personalSign: '',
    financialLeins: '',
    organizationNumber: '',
    personalCollateral: '',
    ownerName: '',
    date: '',
    policy: false
  }
}

export const setCurrentStep = (state: GlobalState, payload: any) => ({
  ...state,
  currentStep: payload,
});

export const setPlaidLinkStatus = (state: GlobalState, payload: any) => ({
  ...state,
  plaid: {
    ...state.plaid,
    ...payload
  },
});

export const updateStep1Data = (state: GlobalState, payload: any) => {
  return {
    ...state,
    step1: {
      ...state.step1,
      ...payload
    }
  }
};

export const updateStep2Data = (state: GlobalState, payload: any) => ({
  ...state,
  step2: {
    ...state.step2,
    ...payload
  }
});

export const updateStep3Data = (state: GlobalState, payload: any) => ({
  ...state,
  step3: {
    ...state.step3,
    ...payload
  }
});

export const updateStep4Data = (state: GlobalState, payload: any) => ({
  ...state,
  step4: {
    ...state.step4,
    ...payload
  }
});

export const updateStep5Data = (state: GlobalState, payload: any) => ({
  ...state,
  step5: {
    ...state.step5,
    ...payload
  }
});

export const updateStep6Data = (state: GlobalState, payload: any) => ({
  ...state,
  step6: {
    ...state.step6,
    ...payload
  }
});

export const updateStep7Data = (state: GlobalState, payload: any) => ({
  ...state,
  step7: {
    ...state.step7,
    ...payload
  }
});

createStore(initialState);
