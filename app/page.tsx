import FilterableServerTable from "@/components/FilterableServerTable";
import Footer from "@/components/Footer";
import Container from "@mui/material/Container";

export default function Home() {
  return (
    <Container sx={{ my: 5 }}>
      <FilterableServerTable />
      <Footer />
    </Container>
  );
}
