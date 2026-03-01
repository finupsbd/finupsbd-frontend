"use server";



export const eligibilityCheckData = async (payload: any, queryData: any, mode?: string) => {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/eligibility-check?amount=${queryData?.amount}&intersteRate=${queryData?.interestRate}&searchTerm${queryData?.searchTerm}&sortOrder=${queryData?.sortOrder}&page=${queryData?.page}&sortKey=${queryData?.sortKey}&tenure=${queryData?.tenure}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-finups-mode": mode || "GENERAL",
        },

        body: JSON.stringify(payload),
      },

    );

    const jsonData = await res.json();

    return jsonData;

  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      error: error,
    };
  }
};

export const withoutEligiblityCards = async (query: { cardType: any }) => {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/eligibility-check/cards?cardType=${query}`,);

    const jsonData = await res.json();

    return jsonData;

  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      error: error,
    };
  }
};



// "use server";

// type EligibilityPayload = {
//   /* define the shape of your payload here */
// };

// type EligibilityQuery = {
//   amount?: number;
//   interestRate?: number;
//   searchTerm?: string;
//   sortOrder?: string;
//   page?: number;
//   sortKey?: string;
//   tenure?: number;
// };

// type EligibilityResult<Data = any> = {
//   success: true;
//   data: Data;
// } | {
//   success: false;
//   error: string;
// };

// export const eligibilityCheckData = async (
//   payload: EligibilityPayload,
//   query: EligibilityQuery
// ): Promise<EligibilityResult> => {
//   // Build URL safely with URL and URLSearchParams
//   const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API}/eligibility-check`);
//   const params = new URLSearchParams();
//   if (query.amount     != null) params.append("amount",     String(query.amount));
//   if (query.interestRate != null) params.append("interestRate", String(query.interestRate));
//   if (query.searchTerm != null)  params.append("searchTerm", query.searchTerm);
//   if (query.sortOrder  != null)  params.append("sortOrder",  query.sortOrder);
//   if (query.page       != null)  params.append("page",       String(query.page));
//   if (query.sortKey    != null)  params.append("sortKey",    query.sortKey);
//   if (query.tenure     != null)  params.append("tenure",     String(query.tenure));
//   url.search = params.toString();

//   try {
//     const res = await fetch(url.toString(), {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     // If the HTTP status is 4xx or 5xx, treat as error
//     if (!res.ok) {
//       const text = await res.text();              // maybe the API returns a plain-text error
//       throw new Error(`HTTP ${res.status}: ${text}`);
//     }

//     // Otherwise parse the JSON
//     const data = await res.json();
//     return { success: true, data };
//   } catch (err) {
//     // Log for debugging
//     console.error("eligibilityCheckData error:", err);

//     // Normalize the error message
//     const message = err instanceof Error
//       ? err.message
//       : "An unexpected error occurred";

//     return { success: false, error: message };
//   }
// };

