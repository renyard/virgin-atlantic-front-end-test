import { h } from "preact";
import { mount, configure } from "enzyme";
import { LOCATIONS } from "../consts/search";
import Adapter from "enzyme-adapter-preact-pure";
import { Result } from "./results.component";

configure({ adapter: new Adapter() });

describe("ResultsComponent", () => {
  let holiday;
  let defaultHoliday = {
    hotel: {
      content: {
        hotelDescription:
          "Thanks to its amazing midtown Manhattan location, this brand spanking new Westin hotel places guests right at the action-packed heart of NYC with a full quota of modern amenities and features to ensure your stay is one to really remember.",
        hotelFacilities: ["Restaurant", "Bar", "Room Service"],
        images: [
          {
            RESULTS_CAROUSEL: {
              url: "//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/300/769549/769549-1-results_carousel.jpg?version=18",
            },
            MOBILE_MAIN: {
              url: "//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/205/769549/769549-1-mobile_main.jpg?version=18",
            },
            IMAGE_DESCRIPTION: "",
          },
        ],
        starRating: "5",
      },
      name: "Westin New York Grand Central",
    },
    pricePerPerson: 1981.03,
  };

  beforeEach(() => {
    holiday = defaultHoliday;
  });

  it("should display the data correctly", async () => {
    const result_component = mount(<Result holiday={holiday} />);

    expect(result_component.find("li.item").hasClass("item")).toBe(true);
    expect(result_component.find("li.item").find("img")).toHaveLength(1);
    expect(result_component.find("li.item").find("h3").text()).toBe(
      "Westin New York Grand Central"
    );
    expect(
      result_component.find("li.item").find("ul.facilities").find("li")
    ).toHaveLength(3);
  });

  it("should not output an image where none exists", async () => {
    holiday.hotel.content.images = [];

    const result_component = mount(<Result holiday={holiday} />);

    expect(result_component.find("li.item").find("img")).toHaveLength(0);
  });

  it("should not output star rating where none exists", async () => {
    holiday.hotel.content.starRating = undefined;

    const result_component = mount(<Result holiday={holiday} />);

    expect(
      result_component.find("li.item").find("div[aria-label]")
    ).toHaveLength(0);
  });

  it("should not output facilities where none exist", async () => {
    holiday.hotel.content.hotelFacilities = [];

    const result_component = mount(<Result holiday={holiday} />);

    expect(
      result_component.find("li.item").find("ul.facilities").find("li")
    ).toHaveLength(0);
  });
});
