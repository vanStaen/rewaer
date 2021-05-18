import React, { Component } from "react";
import { Typography, Divider } from "antd";

const { Title, Paragraph, Text } = Typography;

class InfoPage extends Component {
  render() {
    return (
      <div>
        <Title level={2}>Rewær, the green Fashion App</Title>
        <Paragraph>
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
              leaves every years.
            </span>
          </Text>
        </Paragraph>
        <Paragraph
          copyable={{
            text: "admin@rewear.com",
            tooltips: ["Copy email", "Email copied!"],
          }}
        >
          Please address any questions/comments to <b>admin@rewear.com.</b>
        </Paragraph>

        <Divider plain>What is Rewær?</Divider>
        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
          Rewær is promoting green fashion based on the principle that{" "}
          <span style={{ background: "#C8D6CF" }}>
            the most sustainable piece of clothing is the one you already have
          </span>
          . Offered as a multiplatform application - Web, iOS and Android - it
          aims at organising your garderobe, keep track of your favorites looks
          and helps you discover new combination to wear the clothes you already
          have. It has two main components: fashion organisator and social
          media. Those two are linked as you can authorise friends to have a
          look in your garderobe to help you create looks based on your items.
          You can also use the app to open your garderobe in-real-life and share
          items with your hand pick best friends.
        </Paragraph>

        <Divider plain>Why do you need it?</Divider>
        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
          <em>I don't know what to wear! Do I need new clothes?</em> Fashion accounts for 
          around 10% of greenhouse gas emissions from human activity, but there 
          are ways to reduce the impact your wardrobe has on the climate:{" "}
          <span style={{ background: "#C8D6CF" }}>
            not buying new clothes you don't need
          </span>{" "}
          is one of those solution. Or buying quality things that will last. Or
          simply getting items you can combine with the stuff you already have,
          and avoid having unworn brandnew stuff laying around forever in your
          drawer. But also,{" "}
          <span style={{ background: "#C8D6CF" }}>
            Rewær is your own stylist
          </span>
          : by keeping track of your favorite styles and items, it will help you
          get dress, to style items you like and own but never think of wearing
          - or know how to wear; and get your friends to help you with it!
          Without buying anything new, you will rediscover your own clothes, and
          have the feeling of a brand new garderobe, without spending a cent!{" "}
        </Paragraph>

        <Divider plain>How far are we?</Divider>
        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
          We are still working on a first version including the minimum viables
          features. The backend is done, and the first prototype will be ready
          soon and open to any willing beta tester!{" "}
          <span style={{ background: "#C8D6CF" }}>
            You can already create an account
          </span>
          , and we will ping out when it's ready! The first feature includes the
          main garderobe functions: mangement of <em>Items</em> and{" "}
          <em>Looks</em>, and basic social fonctionalities.
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
        <Paragraph disabled>
          App running in {process.env.NODE_ENV} mode.
          <br />
          ©2021 Rewær All Rights Reserved
        </Paragraph>
      </div>
    );
  }
}

export default InfoPage;
