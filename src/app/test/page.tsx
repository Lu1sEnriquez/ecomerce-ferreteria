export default function DebugEnv() {
  return (
    <div>
      <p>Valor crudo: {process.env.NEXT_PUBLIC_ECOMMERCE_PRIVADO}</p>
      <p>
        ECOMMERCE_PRIVADO ={" "}
        {process.env.NEXT_PUBLIC_ECOMMERCE_PRIVADO === "true"
          ? "true"
          : "false"}
      </p>
    </div>
  );
}
