export async function sendCrashReport(body: string) {
    try {
      const response = await fetch("https://discord.com/api/webhooks/1228472552385417302/sH0cJpymri9SUkzNSva2kkCT_vtnWeg3ukkcnIpjf1TLsYRGvVOGKsX_FMX683jJEXXK", {
        method: "POST",
        body: "content: " + body,
        headers: {
            "Content-Type": "application/json",
          },
      });
      const result = await response.json();
      console.log("Sent debug log: ", result);
    } catch (error) {
      console.error("Error: ", error);
    }
  }