/*
    Example Function called from Flex Plugin to return a JSON object representing an offer.
    
    Inputs:
    phone ==>  Contact's phone number

    ACCESS CONTROL: Uncheck valid Twilio signature
*/

const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(function(context, event, callback) {
// exports.handler = TokenValidator(function(context, event, callback) {

  console.log(event);
  console.log('Token Validated');

  // Create a custom Twilio Response
  // Set the CORS headers to allow Flex to make an HTTP request to the Twilio Function
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // This plugin has the offer hard coded as an example. This would be replaced with the API call to return the correct offer.
  let offer = {
    "offerId": "sovpnne2g4nks62kuk3sc1j6h2",
    "offerItemId": 0,
    "orderStatus": "Reserved",
    "confIDType": "14",
    "confID": "13725569US4",
    "vendor": "Avis",
    "vendorName": "Avis",
    "pickUpDateTime": "2020-11-11 11:0:0",
    "returnDateTime": "2020-11-19 6:9:0",
    "pickUpLocation": {
        "code": "SFO"
    },
    "pickUpLocationDetails": {
        "atAirport": true,
        "code": "SFO",
        "name": "San Francisco Intl Airport",
        "extendedLocationCode": "SFOT01",
        "address1": "780 McDonnell Road",
        "city": "San Francisco",
        "postalCode": "94128",
        "state": "California",
        "stateCode": "CA",
        "country": "U S A",
        "countryCode": "US",
        "phoneNumber": "(1) 650-877-6780"
    },
    "returnLocation": {
        "code": "SFO"
    },
    "returnLocationDetails": {
        "atAirport": true,
        "code": "SFO",
        "name": "San Francisco Intl Airport",
        "extendedLocationCode": "SFOT01",
        "address1": "780 McDonnell Road",
        "city": "San Francisco",
        "postalCode": "94128",
        "state": "California",
        "stateCode": "CA",
        "country": "U S A",
        "countryCode": "US",
        "phoneNumber": "(1) 650-877-6780"
    },
    "airConditionIndicator": true,
    "vehicleTransmissionType": "Automatic",
    "vehicleMakeModelName": "Group E - Ford Fusion or similar",
    "vehicleMakeModelCode": "FCAR",
    "vehicleCategoryCode": "1",
    "vehicleCategory": "Car",
    "vehicleCategoryDescription": "Car",
    "vehicleClassCode": "8",
    "vehicleClass": "Fullsize",
    "vehicleClassDescription": "Fullsize",
    "vehiclePictureURL": "https://www.avis.com/content/dam/cars/xl/2019/ford/2019-ford-fusion-se-sedan-silver_featured.png",
    "rateDistanceUnlimitedIndicator": true,
    "rateDistanceDistUnitName": "Mile",
    "rateDistanceVehiclePeriodUnitName": "RentalPeriod",
    "rateCategory": "3",
    "rateQualifier": "9I",
    "rateTotalAmount": 329.13,
    "estimatedTotalAmount": 453.97,
    "currencyCode": "USD",
    "vehicleCharges": [
        {
            "taxInclusive": false,
            "description": "Minimum 7 Day(s) and 1 Hours(s) rental; Maximum 26 Day(s)",
            "guaranteedInd": false,
            "includedInRate": true,
            "amount": 329.13,
            "currencyCode": "USD",
            "purpose": "1",
            "taxAmounts": [
                {
                    "unitName": "Day",
                    "quantity": "8",
                    "total": 124.84,
                    "currencyCode": "USD",
                    "description": "Taxes and surcharges"
                }
            ]
        },
        {
            "taxInclusive": true,
            "description": "Airport Concession Fee",
            "guaranteedInd": false,
            "includedInRate": true,
            "amount": 38.08,
            "currencyCode": "USD",
            "purpose": "6"
        },
        {
            "taxInclusive": true,
            "description": "Local Tax",
            "guaranteedInd": false,
            "includedInRate": true,
            "amount": 35.73,
            "currencyCode": "USD",
            "purpose": "7"
        },
        {
            "taxInclusive": false,
            "description": "%/RNT COUNTY TAX",
            "guaranteedInd": false,
            "includedInRate": true,
            "amount": 9.92,
            "currencyCode": "USD",
            "purpose": "6"
        },
        {
            "taxInclusive": false,
            "description": "% CALIFORNIA TOURISM FEE",
            "guaranteedInd": false,
            "includedInRate": true,
            "amount": 11.51,
            "currencyCode": "USD",
            "purpose": "6"
        },
        {
            "taxInclusive": false,
            "description": "TRANSPORTATION FEE",
            "guaranteedInd": false,
            "includedInRate": true,
            "amount": 16.0,
            "currencyCode": "USD",
            "purpose": "6"
        },
        {
            "taxInclusive": false,
            "description": "$10.00    EXTENSION FEE MAY APPLY",
            "guaranteedInd": false,
            "includedInRate": false,
            "amount": 0.0,
            "currencyCode": "USD",
            "purpose": "28"
        },
        {
            "taxInclusive": false,
            "description": "FUEL POLICY IS FULL TO FULL",
            "guaranteedInd": false,
            "includedInRate": false,
            "amount": 0.0,
            "currencyCode": "USD",
            "purpose": "28"
        },
        {
            "taxInclusive": false,
            "description": "$15.00    LATE FEE MAY APPLY",
            "guaranteedInd": false,
            "includedInRate": false,
            "amount": 0.0,
            "currencyCode": "USD",
            "purpose": "28"
        }
    ],
    "rateRuleVendorMessages": [
        {
            "title": "Policy Information",
            "subTitle": "Age Requirements",
            "paragraphs": [
                {
                    "listItems": [
                        "      Offer valid at select locations in U.S. only for rentals reserved in advance. Rental must begin on or after 09/01/20 and end on or before 10/31/2020.  Offer applies to Economy through Full Size cars, Minivans, Small Pick-Up Trucks and Intermediate SUVs. For more information, including an estimate of your total rental cost, visit our Internet website at http://www.avis.com__;!!NCc8flgU!Nn3AbtUpkxtyqJGPmQbVV8Olk9dTokmQv96-A6_dm_Q-XvGoVpWHAe3vz_NgedU$ .  Additional mandatory charges may be imposed, including, but not limited to a customer facility charge, airport concession fee, tourism commission assessment, vehicle license recovery fee, facility recovery fees, or other government-imposed taxes or fees. Avis reserves the right to terminate the offer or change the terms at any time.  This offer cannot be combined with any other discount or special rate and cannot be applied to a previous or existing reservation or rental.  Offer is subject to vehicle availability at the time of booking.  Renter and additional driver(s) must meet driver and credit requirements, except for the minimum age per this offer.  Offer available to College Students 18-24 years of age and an Official Student ID must be presented at the time of rental.  Please check your auto insurance policy and/or credit card agreement for rental vehicle coverage.    "
                    ]
                }
            ]
        },
        {
            "title": "Policy Information",
            "subTitle": "e-Tolls",
            "paragraphs": [
                {
                    "listItems": [
                        "E-TOLL COLLECTION DEVICE AVAILABILITY  TOLL PAYMENT TAG PASS  You are responsible for payment of all tolls incurred during the rental period. We offer an optional service called e-toll that allows customers to use electronic toll lanes on highways, bridges, tunnels and other tolled passages. All vehicles are pre-equipped to electronically process tolls. If you do not pay cash for tolls, you automatically opt into our e-toll service to which you agree to pay us or our toll program administrator with whom we will share your credit card/debit information for all tolls incurred during your rental and all related fees, charges and penalties. The e-toll fees may take 4-8 weeks after the rental to be billed to your credit card/debit card on file.  E-TOLL SERVICE CONVENIENCE FEES  The convenience fee for e-Toll usage is $3.95 up to $5.95 USD for each day you use the E-Toll device and there is a maximum of $19.75 up to $29.75 USD per rental month, plus toll charges. There are NO service charges if e-Toll is NOT USED during the rental duration.  E-TOLL UNLIMITED  Available at participating locations in the following states: California, Colorado, Connecticut, Delaware, District of Columbia, Florida, Georgia, Illinois, Indiana, Kentucky, Main, Maryland, Massachusetts, New Hampshire, New Jersey, New York, North Carolina, Oklahoma, Ohio, Pennsylvania, Rhode Island, Texas, Vermont, Washington and West Virginia.   If you use the unlimited E-Toll service, all cost of tolls and convenience Fees are included. For this service, you pay a flat fee of $10.99 up to $23.99 USD per each day of the rental period, regardless of whether or not you incur any tolls, or a flat fee of $54.95 up to $119.95 USD per week. E-toll unlimited must be purchased at the beginning of the rental.  OPTING OUT OF E-TOLL   If you do not choose e-toll unlimited at the time of rental, you may avoid the standard e-toll fees on any given day during the term of the rental if you ensure the transponder shield box is in the \"closed\" position and you pay cash for all tolls, use your own adequately funded, properly mounted and compatible electronic toll device to pay for all tolls, or pay the toll authority directly and follow the toll authority rules and requirements.  For more information on tolling, please visit avis.com/etoll or check at the time of rental."
                    ]
                }
            ]
        },
        {
            "title": "Policy Information",
            "subTitle": "Directions",
            "paragraphs": [
                {
                    "listItems": [
                        "AFTER-HOURS RETURNS  Key Drop Box Available. Charges May Apply.  How it Works: Customer can fill out contract and drop keys inside the drop box located at the location. Lock the vehicle and place the keys and contract in the key drop box.  The box is labeled Avis Budget After Hours Returns. Don't forget to remove all your belongings from the vehicle prior to returning the keys.  A vehicle that is returned after hours will not be checked in until the next business day. If returning after hours when a location is closed, the customer is responsible for the vehicle until the satisfactory check in of the rental vehicle the next business day.  *GENERAL DIRECTIONS*  Airport Terminal Instructions  AIRLINE PASSENGERS Follow signs to the baggage claim area.  Follow signs to Air Train.  At the Air Train Platform, board the Blue Line train to the Rental Car Center. TRAVEL TIME from the terminal to the Car Rental Center is approximately 10 minutes.  Local renters go to car lot.  WALK-UP RENTERS DRIVING NORTH ON HWY 101: Drive past the airport.  Take the San Bruno AVENUE Exit East.  Turn right at the traffic light on N. McDonnell Rd.  Follow the signs to Customer Parking. DRIVING SOUTH ON HWY 101: Take the San Bruno AVENUE Exit.  At the top of the ramp, turn left.  At the United Airlines Bldg. traffic light, turn right on to N. McDonnell Rd.  Follow the signs to Customer Parking. DRIVING NORTH OR SOUTH ON I-280: Take I-380 East Exit at South Airport Blvd. At the bottom of the ramp turn right.  Follow the signs to Car Rental Return and then to Customer Parking.  PREFERRED SERVICE  Bussing Instructions  Proceed to the baggage claim area.  Follow signs to the Air Train.  At the Air Train platform, board the Blue Line Train to the Rental Car Center.  Proceed inside and down the escalator to the third level, south end of the building.  Select & Go Location  Upon arrival at the rental facility, check your email on your smartphone or the Preferred board for the space number of your preassigned vehicle. You have the option to accept the preassigned car or exchange it for a similar car from the Select & Go Exchange Area or upgrade the car to a specialty vehicle from the Select & Go Upgrade Area.  Cars in the Select & Go Upgrade Area have the additional daily cost posted on the hangtag. Once you have selected your vehicle, drive the vehicle to the exit booth and present your driver's license to the Avis representative who will quickly complete the transaction and get you on your way."
                    ]
                }
            ]
        },
        {
            "title": "Policy Information",
            "subTitle": "Additional Fees",
            "paragraphs": [
                {
                    "listItems": [
                        "      A frequent flyer surcharge of up to $1.00 per day applies to all rentals earning frequent flyer miles, points or credits.       Extensions or late returns may result in additional charges.   "
                    ]
                }
            ]
        },
        {
            "title": "Policy Information",
            "subTitle": "Credit Card Policies",
            "paragraphs": [
                {
                    "listItems": [
                        "Avis accepts most major credit cards as credit identification at the time of rental.  The renters name must be on the credit card.  Accepted credit card list:  Avis Charge Card, American Express, AT&T Capital, Diner's Club Int'l, Discover, China UnionPay, GE Capital, JCB, MasterCard, PHH, Sears and Visa.  Some locations may not accept each of the referenced cards.  At the time of rental, we will request an authorization on your charge card for the estimated rental charges.  If you have prepaid the rental, the hold amount will be $250.00.  While this hold is in place, the funds will not be available for your use.  When the rental is over, we will process the reversal, but the bank may take time to post it back to the account.  Note: Prepaid credit cards are not acceptable methods of credit identification to pick up a car at any location. One of the above mentioned cards must be presented. Prepaid credit cards are accepted at time of return only."
                    ]
                }
            ]
        },
        {
            "title": "Policy Information",
            "subTitle": "Drivers License",
            "paragraphs": [
                {
                    "listItems": [
                        "At time of pick-up, driver must present a valid, U.S.-issued driver's license and credit card (or debit card at participating locations) in the driver's name.  If the driver's license is not issued in the U.S., you must present your drivers license and either a passport or a Canadian enhanced license in the driver's name."
                    ]
                }
            ]
        },
        {
            "title": "Policy Information",
            "subTitle": "Towing",
            "paragraphs": [
                {
                    "listItems": [
                        "Towing is not permitted. Vehicles cannot be used to tow or push anything.  A trailer hitch cannot be installed on the vehicles."
                    ]
                }
            ]
        },
        {
            "title": "Policy Information",
            "subTitle": "Travel Into Other Countries",
            "paragraphs": [
                {
                    "listItems": [
                        "Canada:  Vehicles may be driven into Canada with no restrictions.  The rental counter must be notified at the time of rental that you plan to drive into Canada so the location can provide a Canadian Non-Resident Insurance Card (provided at no cost).  Based on availability, one-way rentals may be allowed to some Canada cities.  Mexico:  Vehicles rented at this location are not allowed to travel into Mexico."
                    ]
                }
            ]
        },
        {
            "title": "Policy Information",
            "subTitle": "Optional Coverages",
            "paragraphs": [
                {
                    "listItems": [
                        "Acceptance of the Loss Damage Waiver relieves the renter and authorized additional drivers of responsibility for loss of, or damage to the Avis car, when they comply with the terms and conditions listed on the rental document jacket. At the time of rental, the customer must initial whether he/she accepts or declines the LDW and optional services. LDW and optional services must be signed for at the rental counter. LDW is taxable. If LDW is not accepted, the customer is financially responsible for the full value of:      Accident damage      Glass damage      Stolen items (radio, battery, etc.)      Vandalism      Theft of the car   Exceptions: In Wisconsin, if LDW is not accepted, the renter is liable for all loss or damage to the Avis car due to an accident or reckless, wanton behavior. In Illinois, if LDW is not accepted, the customer is financially responsible for the following types of damage, up to a maximum of $16,000.00 for rentals :      Accident damage      Glass damage      Stolen items (radio, battery, etc.)      Vandalism      Theft of the car   Canceling LDW Once LDW has been purchased, it must remain on the contract. The customer has the option to return the car & close the rental agreement; however, this could change the rate for the rental agreement and a different, possibly higher, rate could apply for a new rental. Exceptions: Customers who rent in New York and purchase LDW in New York can decide to cancel this service at no charge, within specific guidelines:      Rental must be 2 days or more.      The cancellation must be within the first 24 hours of the rental.      The actual renter must take the car to an Avis location for inspection & must sign a cancellation notice.   Loss of Use The customer may also be responsible for reimbursing Avis for the revenue lost by not being able to use the car while it is being repaired or not recovered due to theft (referred to as Loss of Use). Global insurance coverages are always subject to change. Please verify at time of rental."
                    ]
                }
            ]
        },
        {
            "title": "Policy Information",
            "subTitle": "Fuel Policy",
            "paragraphs": [
                {
                    "listItems": [
                        "The car must be returned with a full tank of gas or there will be a charge for refueling. If you have refueled please keep your receipt for verification purposes.     Most locations offer a prepaid gas option which you can accept at the rental location.     If the car is driven less than 75 miles there is a $15.99 USD -or $16.99 USD in California refueling fee unless a gas receipt is presented at the time of return.      What type of fuel do I use in my vehicle?  Click Here"
                    ]
                }
            ]
        },
        {
            "title": "Policy Information",
            "subTitle": "Debit Card Policies",
            "paragraphs": [
                {
                    "listItems": [
                        "This location does accept bank debit cards with the MasterCard or Visa logo at the time of rental if you are at least 25 years of age. At airport locations you will be required to show proof of a return airline flight that corresponds with your rental. You will be subject to a credit check to determine and ensure credit worthiness before releasing the car to you. The name of the renter must be on the debit card. If your credit file is frozen with Equifax, you will be required to lift the restriction prior to your rental. Lifting the restriction does not guarantee that you will be able to rent a vehicle as you will still be subject to a credit check.  At the time of rental, a debit card can only be used for the required hold if renting: Economy cars, Compact cars, Intermediate cars, Standard cars, Full-Size cars, Premium cars, Minivans, Intermediate SUVs, Standard SUVs, Standard Elite SUVs & 12 Passenger Vans. A check/debit card cannot be used for any other vehicle classes including Avis Specialty or Avis Select Series.    Avis will generally request an authorization hold against your account for the estimated charges of the rental but reserves the right in its sole discretion, to request an extra value to be based on certain factors as we deem appropriate. If you have prepaid the rental with a debit card, the hold $250.00. THESE FUNDS WILL NOT BE AVAILABLE FOR YOUR USE. When the rental is over we will process the reversal but the bank may take time to post it back to the account.  If you fail to return the vehicle as agreed, Avis will obtain additional authorizations from your account to cover the rental charges.  Avis is not responsible for any returned checks or over-drafts based on this policy.  Positive identification in addition to your driver's license may be required.  Note: Prepaid Debit/Gift cards are not acceptable methods of credit identification to pick up a car at any location. One of the above mentioned cards must be presented. Prepaid Debit/Gift cards are accepted at time of return only.  "
                    ]
                }
            ]
        }
    ],
    "createdDateTime": "2020-10-26 20:25:1",
    "lastUpdateDateTime": "2020-10-26 20:25:1",
    "orderId": "26ibhv94u95u8jj1623eoukffo"
};
  console.log(offer);
  
  response.appendHeader('Content-Type', 'application/json');
  response.setBody(offer);
  
  callback(null, response);

});