import React from "react";
import { Typography, Divider } from "antd";

import "./Info.css";

const { Title, Paragraph, Text } = Typography;

export const Info = () => {
  const today = new Date();
  const year = today.getFullYear();

  const elispisthreeshold = window.window.innerWidth < 530 ? 7 : 3;

  return (
    <div className="info__container">
      <Title level={3}>Rewaer, the green Fashion App</Title>
      <Paragraph style={{ textAlign: "justify", textJustify: "inter-word" }}>
        <Text type="secondary">
          The Fashion App for minimalistic and sustainable geniuses! <br />
          <span
            style={{
              background: "#6d917e",
              color: "#FFFFFF",
              padding: "2px 3px",
            }}
          >
            Renew your garderobe without buying: only trees should get new
            leaves every year.
          </span>
        </Text>
      </Paragraph>
      <Paragraph
        copyable={{
          text: "admin@rewear.com",
          tooltips: ["Copy email", "Email copied!"],
        }}
        style={{ textAlign: "justify", textJustify: "inter-word" }}
      >
        Please address any questions/comments to <b>admin@rewear.com.</b>
      </Paragraph>
      <Divider orientation="left" plain>
        What is Rewaer?
      </Divider>
      <Paragraph
        ellipsis={{ rows: elispisthreeshold, expandable: true, symbol: "more" }}
        style={{ textAlign: "justify", textJustify: "inter-word" }}
      >
        Rewaer is promoting green fashion based on the principle that{" "}
        <span style={{ background: "#C8D6CF" }}>
          the most sustainable piece of clothing is the one you already have
        </span>
        . Offered as a multiplatform application - Web, iOS and Android - it
        aims at organising your garderobe, keep track of your favorites looks
        and helps you discover new combination to wear the clothes you already
        have. It has two main components: fashion organisator and social media.
        Those two are linked as you can authorise friends to have a look in your
        garderobe to help you create looks based on your items. You can also use
        the app to open your garderobe in-real-life and share items with your
        hand-picked best friends.
      </Paragraph>
      <Divider orientation="left" plain>
        Why do you need it?
      </Divider>
      <Paragraph
        ellipsis={{ rows: elispisthreeshold, expandable: true, symbol: "more" }}
        style={{ textAlign: "justify", textJustify: "inter-word" }}
      >
        <em>I do not know what to wear! Do I need new clothes?</em> Fashion
        accounts for around 10% of greenhouse gas emissions from human activity,
        but there are ways to reduce the impact your wardrobe has on the
        climate:{" "}
        <span style={{ background: "#C8D6CF" }}>
          not buying new clothes you do not need
        </span>{" "}
        is one of those solutions. Or buying quality things that will last. Or
        simply getting items you can combine with the stuff you already have,
        and avoid having unworn brand new stuff laying around forever in your
        drawer. But also,{" "}
        <span style={{ background: "#C8D6CF" }}>
          Rewaer is your own stylist
        </span>
        : by keeping track of your favorite styles and items, it will help you
        get dressed, to style items you like and own but never think of wearing{" "}
        - or know how to wear; and get your friends to help you with it! Without
        buying anything new, you will rediscover your own clothes, and have the
        feeling of a brand new garderobe, without spending a cent!{" "}
      </Paragraph>
      <Divider orientation="left" plain>
        How far are we?
      </Divider>
      <Paragraph
        ellipsis={{ rows: elispisthreeshold, expandable: true, symbol: "more" }}
        style={{ textAlign: "justify", textJustify: "inter-word" }}
      >
        We are still working on a first version including the minimum viable
        features.{" "}
        <span style={{ background: "#C8D6CF" }}>
          You can already create an account
        </span>
        , and we will ping out when it is ready! The first feature includes the
        main garderobe functions: management of <em>Items</em> and{" "}
        <em>Looks</em>, and basic social functionalities.
      </Paragraph>
      {/*
        <Divider orientation="left" plain>
          Sustainable fashion
        </Divider>
        <Paragraph>
          https://www.sustainablefashionmatterz.com/what-is-sustainable-fashion
        </Paragraph>   
        */}

      <Divider />
      <Paragraph disabled style={{ fontSize: "12px", textAlign: "center" }}>
        ©{year} Rewaer All Rights Reserved
      </Paragraph>
    </div>
  );
};
