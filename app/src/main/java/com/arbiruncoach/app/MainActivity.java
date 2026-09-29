package com.arbiruncoach.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.*;
import android.app.Activity;

public class MainActivity extends Activity {
    private TextView status;
    @Override public void onCreate(Bundle b){ super.onCreate(b); setContentView(R.layout.activity_main);
        status=findViewById(R.id.status);
        findViewById(R.id.connect).setOnClickListener(v -> {
            // Replace with your deployed backend URL. The backend generates the Strava OAuth URL.
            String backend = "https://YOUR-BACKEND-DOMAIN.example.com/auth/strava";
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(backend)));
        });
        Intent i=getIntent(); if(i!=null && i.getData()!=null) status.setText("OAuth callback diterima: "+i.getData());
    }
}
