import NavBackButton from "@components/ItemDetailsPage/NavBackButton";
import CustomHeader from "@components/shared/CustomHeader";
import { Container, Group, Skeleton, Title } from "@mantine/core";

import classes from "@styles/ItemDetailsPage/ItemDetailsLoading.module.css";

export default function ItemDetailsLoading() {
  return (
    <>
      <CustomHeader containerSize="xl">
        <Group wrap="nowrap">
          <NavBackButton />
          <Title lineClamp={2} order={3}>
            Loading item details...
          </Title>
        </Group>
      </CustomHeader>
      <Container size="xl" className={classes.pageContainer}>
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton
          height={8}
          className={classes.skeletonMT}
          width="50%"
          radius="xl"
        />

        <Skeleton height={8} className={classes.skeletonBlockMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton
          height={8}
          className={classes.skeletonMT}
          width="75%"
          radius="xl"
        />

        <Skeleton height={8} className={classes.skeletonBlockMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton height={8} className={classes.skeletonMT} radius="xl" />
        <Skeleton
          height={8}
          className={classes.skeletonMT}
          width="25%"
          radius="xl"
        />
      </Container>
    </>
  );
}
