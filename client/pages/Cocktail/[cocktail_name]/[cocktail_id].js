import { Container, Typography } from "@mui/material";
import Image from "next/image";
import styled from "@emotion/styled";
import { CocktailCard } from "../../../components/CocktailCard";
import { ViewAllBySpirit } from "../../../components/ViewAllBySpiritButton";

// Styles
const StandardTypography = styled(Typography)({
  fontSize: "50px",
  fontWeight: "bold",
  textAlign: "center",
  paddingTop: "5px",
  paddingBottom: "3px",
});

const CardStyledText = styled(Typography)({
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "left",
  paddingTop: "5px",
  paddingBottom: "25px",
});

const CardHeaderText = styled(Typography)({
  fontSize: "25px",
  fontWeight: "600",
  textAlign: "left",
  paddingTop: "5px",
  fontFamily: "roboto",
  paddingBottom: "15px",
});

const NewSectionText = styled(Typography)({
  fontSize: "40px",
  fontWeight: "400",
  textAlign: "center",
  paddingTop: "5px",
  color: "gray",
  paddingBottom: "30px",
});

export default function LearnSpirit({ data, spirits, Type }) {
  return (
    <Container maxWidth="md">
      {/*Recipe*/}
      <StandardTypography>{data.name}</StandardTypography>
      <Image src={data.image} alt={data.name} width={500} height={300} />
      <CardHeaderText>Ingredients:</CardHeaderText>
      <CardStyledText>{data.ingredients}</CardStyledText>
      <CardHeaderText>Instructions:</CardHeaderText>
      <CardStyledText>{data.instructions}</CardStyledText>

      {/*Top 2 recipe cards from selected spirit type */}
      <NewSectionText>Other Recipes:</NewSectionText>
      <CocktailCard data={spirits} />
      <ViewAllBySpirit name={data.name} id={data.id} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  //Get spirit from url parameter
  const query = context.query.cocktail_id;

  //recipe
  const res = await fetch(
    `https://spring-street-app.uw.r.appspot.com/cocktails/${query}`
  );
  const data = await res.json();
  const spirit = data.spirit;

  //Top 2 recipes for same spirit type
  const spr = await fetch(
    `https://spring-street-app.uw.r.appspot.com/cocktails/spirit/excp/${spirit}`
  );
  const spirits = await spr.json();

  //Spirit Type
  const Typeres = await fetch(
    `https://spring-street-app.uw.r.appspot.com/spirits/${spirit}`
  );
  const Type = await Typeres.json();
  return {
    props: { data, spirits, Type },
  };
}
