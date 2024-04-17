import React from "react";
import Message from "../../component/utils/message";

export default function PaymentMessage(data) {
  return (
    <>
      <Message  data={data.data} />
    </>
  );
}
