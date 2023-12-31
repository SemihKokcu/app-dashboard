import client from "./client";

const AboutUsService = () => ({
  async createAboutUs(aboutUsContent) {
    try {
      const response = await client.post("api/aboutus/add", aboutUsContent);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async getAboutUs() {
    try {
      const response = await client.get("api/aboutus/getAll");
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async updateAboutUs(aboutUsContent) {
    try {
      const response = await client.put("api/aboutus/update", aboutUsContent);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
});

export const aboutUsService = AboutUsService();
