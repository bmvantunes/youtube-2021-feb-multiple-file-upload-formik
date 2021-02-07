import { Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ values, errors }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <h1>Hello YouTube 😃</h1>
              </Grid>

              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
