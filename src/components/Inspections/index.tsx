'use client'

import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import FindInspections from "./FindInspections";
import ShowInspections from "./ShowInspections";
import { useAppContext } from "@/context";
import { routeNames } from "@/constants/routes";

const FormSchema = z.object({
  zipCode: z.string().refine((val) => {
    const int = parseInt(val, 10)
    return !Number.isNaN(int) && val.length === 5
  }, {
    message: "Zip code is required and needs to be five (5) digits"
  }),
})

export type FindInspectionsProps = {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  form: UseFormReturn<{
    zipCode: string;
  }, any, undefined>;
}

const Inspections = () => {
  const { context, setContext } = useAppContext()
  const [isNewUser, setNewUser] = useState<boolean>(!context.user || !context.inspections);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      zipCode: "",
    },
  });


  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const yarr: YelpBusinesses = [
      {
          "id": "d19ZJtGG-moBb2kFBBkHfQ",
          "alias": "mayflower-home-inspection-reading",
          "name": "Mayflower Home Inspection",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/xLSO4zsJDDnozcpM_nF-oQ/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/mayflower-home-inspection-reading?adjust_creative=XRHhfEK7m-dsGNFnlvc7yA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=XRHhfEK7m-dsGNFnlvc7yA",
          "review_count": 38,
          "categories": [
              {
                  "alias": "home_inspectors",
                  "title": "Home Inspectors"
              }
          ],
          "rating": 5,
          "coordinates": {
              "latitude": 42.518541,
              "longitude": -71.103603
          },
          "transactions": [],
          "location": {
              "address1": "346 Main St",
              "address2": null,
              "address3": "",
              "city": "Reading",
              "zip_code": "01867",
              "country": "US",
              "state": "MA",
              "display_address": [
                  "346 Main St",
                  "Reading, MA 01867"
              ]
          },
          "phone": "+17815871845",
          "display_phone": "(781) 587-1845",
          "distance": 17225.268891599044,
          "attributes": {
              "business_temp_closed": null,
              "waitlist_reservation": null
          }
      },
      {
          "id": "V5ziblEbMPlgMV5F7bsOzQ",
          "alias": "able-home-inspection-groveland",
          "name": "Able Home Inspection",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/raZ9X1aAfMe0IacwxaWnFQ/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/able-home-inspection-groveland?adjust_creative=XRHhfEK7m-dsGNFnlvc7yA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=XRHhfEK7m-dsGNFnlvc7yA",
          "review_count": 22,
          "categories": [
              {
                  "alias": "home_inspectors",
                  "title": "Home Inspectors"
              }
          ],
          "rating": 4.3,
          "coordinates": {
              "latitude": 42.7467,
              "longitude": -71.02298
          },
          "transactions": [],
          "location": {
              "address1": "",
              "address2": "",
              "address3": "",
              "city": "Groveland",
              "zip_code": "01834",
              "country": "US",
              "state": "MA",
              "display_address": [
                  "Groveland, MA 01834"
              ]
          },
          "phone": "+19784787183",
          "display_phone": "(978) 478-7183",
          "distance": 10491.17717771519,
          "attributes": {
              "business_temp_closed": null,
              "waitlist_reservation": null
          }
      },
      {
          "id": "HSmr-IKkU7H5r-x4q_mjCg",
          "alias": "coastal-home-inspections-boston",
          "name": "Coastal Home Inspections",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/QwY9j8SjpHrSlH-2mUp7Fw/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/coastal-home-inspections-boston?adjust_creative=XRHhfEK7m-dsGNFnlvc7yA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=XRHhfEK7m-dsGNFnlvc7yA",
          "review_count": 12,
          "categories": [
              {
                  "alias": "home_inspectors",
                  "title": "Home Inspectors"
              }
          ],
          "rating": 3.8,
          "coordinates": {
              "latitude": 42.3328025,
              "longitude": -71.0396668
          },
          "transactions": [],
          "location": {
              "address1": "156 I St",
              "address2": null,
              "address3": "",
              "city": "Boston",
              "zip_code": "02125",
              "country": "US",
              "state": "MA",
              "display_address": [
                  "156 I St",
                  "Boston, MA 02125"
              ]
          },
          "phone": "+15082374628",
          "display_phone": "(508) 237-4628",
          "distance": 37982.28690234973,
          "attributes": {
              "business_temp_closed": null,
              "waitlist_reservation": null
          }
      },
      {
          "id": "VUBKqLvyvr59bbTBcCWU_w",
          "alias": "able-home-inspection-portsmouth",
          "name": "Able Home Inspection",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/ZbI-hBBquJ2UOzTRAQuzZA/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/able-home-inspection-portsmouth?adjust_creative=XRHhfEK7m-dsGNFnlvc7yA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=XRHhfEK7m-dsGNFnlvc7yA",
          "review_count": 6,
          "categories": [
              {
                  "alias": "home_inspectors",
                  "title": "Home Inspectors"
              }
          ],
          "rating": 5,
          "coordinates": {
              "latitude": 43.07313,
              "longitude": -70.75838
          },
          "transactions": [],
          "location": {
              "address1": "",
              "address2": null,
              "address3": null,
              "city": "Portsmouth",
              "zip_code": "03801",
              "country": "US",
              "state": "NH",
              "display_address": [
                  "Portsmouth, NH 03801"
              ]
          },
          "phone": "+16035818691",
          "display_phone": "(603) 581-8691",
          "distance": 51530.571302682096,
          "attributes": {
              "business_temp_closed": null,
              "waitlist_reservation": null
          }
      },
      {
          "id": "9UvBDU57qGWUt8JUFksbKw",
          "alias": "dbc-home-inspections-north-hampton-3",
          "name": "DBC Home Inspections",
          "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/RKt_b-_MEuIb3re-HPAcfA/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/dbc-home-inspections-north-hampton-3?adjust_creative=XRHhfEK7m-dsGNFnlvc7yA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=XRHhfEK7m-dsGNFnlvc7yA",
          "review_count": 8,
          "categories": [
              {
                  "alias": "home_inspectors",
                  "title": "Home Inspectors"
              }
          ],
          "rating": 2.6,
          "coordinates": {
              "latitude": 42.9787826538086,
              "longitude": -70.8300323486328
          },
          "transactions": [],
          "location": {
              "address1": "",
              "address2": null,
              "address3": null,
              "city": "North Hampton",
              "zip_code": "03862",
              "country": "US",
              "state": "NH",
              "display_address": [
                  "North Hampton, NH 03862"
              ]
          },
          "phone": "+16037705324",
          "display_phone": "(603) 770-5324",
          "distance": 40443.6956027851,
          "attributes": {
              "business_temp_closed": null,
              "waitlist_reservation": null
          }
      }
  ]

    setContext({
      ...context,
      user: {
        ...context.user,
        zipCode: data.zipCode
    },
      inspections: {
        offeredInspectors: yarr
      }
    })
    
    setNewUser(false)
    // fetch("/api/inspections", {
    //   method: "POST",
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then((response) => response.json())
    // .then((body) => {
    //   const yelpBusinesses: YelpBusinesses = body.businesses
    //   setBusinesses(yelpBusinesses)
    //   setUserData({...data})
    //   setNewUser(false)
    // })
    // .catch((error) => {
    //   console.error("There was an error processing the API call: ", error)
    // });
  }
  
  useEffect(() => setContext({ ...context, route: routeNames.INSPECTIONS }), [])
  return (
    <>
      {isNewUser ? (
        <FindInspections form={form} onSubmit={onSubmit}/>
      ) : (
        <ShowInspections />
      )}
    </>
  )
}

export default Inspections;