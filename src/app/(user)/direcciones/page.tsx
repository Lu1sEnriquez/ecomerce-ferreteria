import { auth } from "@/auth";
import AddressGrid from "@/components/layout/address/address-grid";
import { getUserDirections } from "@/services/directions/directions-services";
import { ModalAuth } from "@/modules/common/components/auth/modalAuth";

export default async function Home() {

  const session = await auth();
  if( !session?.user?.user.documentId ){
    return (
      <div>
        <ModalAuth></ModalAuth>
      </div>
    )
  }
  const address = await getUserDirections( session?.user?.user.documentId );
  
  return (
    <main className="container mx-auto px-4 py-8">
      <AddressGrid session={session} address={address.data} />
    </main>
  )
}
